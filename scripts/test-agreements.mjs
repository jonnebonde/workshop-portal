import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { buildSync } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { unzipSync, strFromU8 } from 'fflate';
const require = createRequire(import.meta.url);
function load(file, overrides = {}) {
  const result = buildSync({ entryPoints: [file], bundle: true, write: false, format: 'cjs', platform: 'node', packages: 'external', jsx: 'automatic' });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(id => overrides[id] ?? require(id), module, module.exports);
  return module.exports;
}
const { selectAgreements, filterLines } = load('src/features/agreements/model.ts');
const { getDemoAgreements } = load('src/features/agreements/demoRepository.ts');
const { default: View } = load('src/features/agreements/AgreementsView.tsx');
const { buildAgreementExport, buildAgreementExcelExport, downloadAgreementExport } = load('src/features/agreements/export.ts');
test('assignments exclude other workshops and unpublished versions', () => {
  const { scope, agreements } = getDemoAgreements('demo-user');
  const own = agreements[0];
  const catalog = [{ ...own, versions: [...own.versions, { ...own.versions[0], id: 'secret', status: 'Draft' }, { ...own.versions[0], id: 'future', status: 'Scheduled' }] }, { ...own, id: 'another-workshop' }];
  const visible = selectAgreements(scope, catalog);
  assert.deepEqual(visible.map(a => a.id), [own.id]);
  assert.deepEqual(visible[0].versions.map(v => v.status), ['Active', 'Historical']);
  assert.equal(catalog[0].versions.length, 4);
  assert.deepEqual(selectAgreements(null, catalog), []);
  assert.deepEqual(getDemoAgreements('unknown').agreements, []);
  assert.deepEqual(getDemoAgreements(undefined).agreements, []);
});
test('only explicitly assigned framework terms; no inferred fallback', () => {
  const { scope, agreements } = getDemoAgreements('demo-user');
  assert.equal(agreements.filter(a => a.insurer === 'Example Insurance A' && a.kind === 'Framework terms').length, 0);
  assert.deepEqual(selectAgreements({ ...scope, agreementIds: [] }, agreements), []);
  const historical = selectAgreements(scope, agreements.map(a => ({ ...a, versions: a.versions.filter(v => v.status === 'Historical') })));
  assert.equal(historical.length, agreements.length);
  assert.ok(historical.every(a => a.versions.every(v => v.status === 'Historical')));
  const html = renderToStaticMarkup(React.createElement(View, { workshop: scope.name, agreements: historical }));
  assert.match(html, /Historical version — not current prices/);
  assert.match(html, /Export V1…/);
  assert.match(html, /aria-haspopup="dialog"/);
  assert.doesNotMatch(html, /File format/);
  assert.doesNotMatch(html, /Current prices/);
});

test('export dialog shows the exact historical version and format options before download', () => {
  // Render dialog content without Headless UI's browser-only portal/focus management.
  const Dialog = ({ children }) => React.createElement('div', { role: 'dialog' }, children);
  Dialog.Panel = 'section';
  Dialog.Title = 'h2';
  Dialog.Description = 'p';
  const Modal = load('src/features/agreements/AgreementExportModal.tsx', { '@headlessui/react': { Dialog } }).default;
  const { scope, agreements } = getDemoAgreements('demo-user');
  const agreement = agreements[0];
  const html = renderToStaticMarkup(React.createElement(Modal, {
    workshop: scope.name, agreement, version: agreement.versions[1], onClose() {},
  }));
  assert.match(html, /Export agreement/);
  assert.match(html, /Demo workshop/);
  assert.match(html, /Example Insurance A/);
  assert.match(html, /V1 · Historical version — not current prices/);
  assert.match(html, /2026-01-01 to 2026-08-31/);
  assert.match(html, /value="xlsx" selected=""/);
  assert.match(html, /CSV \(\.csv\)/);
  assert.match(html, /Search filters do not apply/);
  assert.match(html, /Export V1 \(Excel\)/);
  assert.match(html, /Cancel/);
});

test('CSV exports exactly the selected version with context on every price row', () => {
  const { scope, agreements } = getDemoAgreements('demo-user');
  const agreement = agreements[0];
  const historical = agreement.versions[1];
  const { filename, content } = buildAgreementExport(scope.name, agreement, historical);
  assert.ok(content.startsWith('\uFEFF'));
  assert.match(filename, /chain-a-v1-Historical-2026-01-01-2026-08-31\.csv$/);
  const rows = content.trimEnd().split('\r\n');
  assert.equal(rows.length, historical.lines.length + 1);
  for (const row of rows.slice(1)) {
    assert.ok(row.includes('"Demo workshop";"Example Insurance A"'));
    assert.ok(row.includes('"chain-a-v1";"V1";"Historical";"2026-01-01";"2026-08-31"'));
    assert.ok(row.includes('"NOK";"Excluded"'));
  }
  assert.ok(rows[1].includes('"1710"'));
  assert.ok(!rows[1].includes('"1800"'));
  const current = buildAgreementExport(scope.name, agreement, agreement.versions[0]);
  assert.match(current.filename, /-Active-2026-09-01-open\.csv$/);
  assert.ok(current.content.includes('"1800"'));
  assert.ok(content.includes('"Parts";"";"15"'));
  assert.throws(() => buildAgreementExport(scope.name, agreement, { ...historical, status: 'Draft' }));
});

test('CSV quotes delimiters, quotes and newlines and neutralizes text formulas', () => {
  const { agreements } = getDemoAgreements('demo-user');
  const version = { ...agreements[0].versions[0], lines: [{
    ...agreements[0].versions[0].lines[0], article: '=1+1', comment: 'line; "quoted"\nnext',
  }] };
  const agreement = { ...agreements[0], versions: [version] };
  const { content } = buildAgreementExport('  @workshop', agreement, version);
  assert.ok(content.includes('"\'=1+1"'));
  assert.ok(content.includes('"\'  @workshop"'));
  assert.ok(content.includes('"line; ""quoted""\nnext"'));
});

test('download uses selected historical CSV and cleans up the link and URL', async () => {
  const { scope, agreements } = getDemoAgreements('demo-user');
  const agreement = agreements[0];
  const version = agreement.versions[1];
  const originalDocument = globalThis.document;
  const originalCreate = URL.createObjectURL;
  const originalRevoke = URL.revokeObjectURL;
  const originalTimeout = globalThis.setTimeout;
  let blob;
  let clicked = false;
  let removed = false;
  let revoked;
  const link = { click() { clicked = true; }, remove() { removed = true; } };
  try {
    globalThis.document = { createElement: () => link, body: { appendChild() {} } };
    URL.createObjectURL = value => { blob = value; return 'blob:test'; };
    URL.revokeObjectURL = value => { revoked = value; };
    globalThis.setTimeout = callback => callback();
    await downloadAgreementExport(scope.name, agreement, version, 'csv');
    assert.equal(clicked, true);
    assert.equal(removed, true);
    assert.equal(revoked, 'blob:test');
    assert.equal(link.href, 'blob:test');
    assert.equal(link.download, buildAgreementExport(scope.name, agreement, version).filename);
    assert.match(await blob.text(), /"V1";"Historical"/);
  } finally {
    globalThis.document = originalDocument;
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
    globalThis.setTimeout = originalTimeout;
  }
});

test('Excel exports real XLSX with the selected version, numeric prices and literal text', async () => {
  const { scope, agreements } = getDemoAgreements('demo-user');
  const historical = agreements[0].versions[1];
  const version = { ...historical, lines: historical.lines.map((line, i) => i ? line : { ...line, article: '=1+1' }) };
  const agreement = { ...agreements[0], versions: [version] };
  const { filename, content } = await buildAgreementExcelExport(scope.name, agreement, version);
  assert.match(filename, /-v1-Historical-2026-01-01-2026-08-31\.xlsx$/);
  const archive = unzipSync(new Uint8Array(await content.arrayBuffer()));
  assert.ok(archive['[Content_Types].xml']);
  const sheet = strFromU8(archive['xl/worksheets/sheet1.xml']);
  const xml = Object.entries(archive).filter(([name]) => name.endsWith('.xml')).map(([, bytes]) => strFromU8(bytes)).join('\n');
  assert.match(xml, /Historical/);
  assert.match(xml, /chain-a-v1/);
  assert.match(xml, /2026-08-31/);
  assert.match(xml, /Demo workshop/);
  assert.match(xml, /Example Insurance A/);
  assert.match(xml, /=1\+1/);
  assert.doesNotMatch(sheet, /<f[ >]/);
  assert.match(sheet, /<v>1710<\/v>/);
  assert.doesNotMatch(sheet, /<v>1800<\/v>/);
  assert.match(sheet, /ySplit="16"/);
});

test('assigned empty agreements stay visible; unpublished-only agreements do not', () => {
  const { scope, agreements } = getDemoAgreements('demo-user');
  const own = agreements[0];
  const empty = { ...own, versions: [{ ...own.versions[0], lines: [] }] };
  const html = renderToStaticMarkup(React.createElement(View, { workshop: scope.name, agreements: selectAgreements(scope, [empty]) }));
  assert.match(html, /This agreement has no price lines/);
  assert.deepEqual(selectAgreements(scope, [{ ...own, versions: [{ ...own.versions[0], status: 'Draft' }] }]), []);
});
test('search combines category and vehicle without modifying versions', () => {
  const lines = getDemoAgreements('demo-user').agreements[0].versions[0].lines;
  assert.equal(filterLines(lines, '  WINDSCREEN ', 'Van', 'Glass work').length, 1);
  assert.equal(filterLines(lines, 'no-such-article', 'all', 'all').length, 0);
  assert.equal(filterLines(lines, 'discount', 'all', 'Parts').length, 1);
  assert.equal(lines.length, 9);
});
test('read view has no administration or preferred-partner surface', () => {
  const { agreements } = getDemoAgreements('demo-user');
  const html = renderToStaticMarkup(React.createElement(View, { workshop: 'Demo workshop', agreements }));
  assert.match(html, /Version history/);
  assert.doesNotMatch(html, /Preferred partners|Create agreement|Publish|Upload price|Deactivate|Edit agreement/);
  assert.match(renderToStaticMarkup(React.createElement(View, { workshop: 'None', agreements: [] })), /No agreements available/);
});
