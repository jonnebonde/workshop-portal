import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { webcrypto } from 'node:crypto';
import { buildSync } from 'esbuild';
import React from 'react';

globalThis.crypto ??= webcrypto;
const require = createRequire(import.meta.url);
function load(file, overrides = {}) {
  const result = buildSync({ entryPoints: [file], bundle: true, write: false, format: 'cjs', platform: 'node', packages: 'external', jsx: 'automatic' });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(id => overrides[id] ?? require(id), module, module.exports);
  return module.exports;
}
const { createOrderLineDraft, isOrderLineComplete, checkDemoOrderLine } = load('src/utils/orderLines.ts');
const part = { ...createOrderLineDraft(), category: 'Glass', articleNr: 'DEMO-GL-001', quantity: 1, price: 3000 };
const line = { id: 'DEMO-GL-001', article: 'Demo service', vehicle: 'Van', category: 'Glass', price: 3000, comment: '', billable: true };
const agreement = { id: 'demo-agreement', insurer: 'Example Insurance', versions: [{ id: 'v2', status: 'Active', lines: [line] }] };

test('requires all applicable fields, preserves zero prices, and excludes invalid numbers', () => {
  assert.equal(isOrderLineComplete(createOrderLineDraft()), false);
  assert.equal(isOrderLineComplete({ ...part, price: 0, discount: 0 }), true);
  for (const fields of [{ articleNr: ' ' }, { category: '' }, { quantity: 0 }, { price: NaN }, { discount: NaN }, { quantity: -1 }, { price: Infinity }, { discount: 101 }]) {
    assert.equal(isOrderLineComplete({ ...part, ...fields }), false);
  }
  assert.equal(checkDemoOrderLine(createOrderLineDraft(), [agreement], agreement.insurer), null);
  assert.equal(isOrderLineComplete({ type: 'labor', description: 'Demo service', hours: 1, ratePerHour: 0 }), true);
});

test('demo checks only supplied insurer/current matches and does not change prices or approval', () => {
  const checked = checkDemoOrderLine(part, [agreement], agreement.insurer);
  assert.equal(checked.demoAgreementCheck.status, 'matched');
  assert.equal(checked.demoAgreementCheck.versionId, 'v2');
  assert.equal(checked.price, 3000);
  assert.equal(checked.status, 'Pending');
  assert.equal(part.demoAgreementCheck, undefined);
  for (const [item, agreements, insurer] of [
    [part, [agreement], 'Other insurer'],
    [part, [], agreement.insurer],
    [{ ...part, articleNr: 'Unknown' }, [agreement], agreement.insurer],
    [{ ...part, price: 3200 }, [agreement], agreement.insurer],
    [part, [agreement, { ...agreement, id: 'overlap' }], agreement.insurer],
    [part, [{ ...agreement, versions: [{ ...agreement.versions[0], status: 'Historical' }] }], agreement.insurer],
    [part, [{ ...agreement, versions: [{ ...agreement.versions[0], lines: [{ ...line, price: null }] }] }], agreement.insurer],
    [{ id: 'labor', type: 'labor', description: 'Demo service', hours: 1, ratePerHour: 3000, total: 3000 }, [agreement], agreement.insurer],
  ]) assert.equal(checkDemoOrderLine(item, agreements, insurer).demoAgreementCheck.status, 'review_required');
});

function walk(node, type) {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node)) return node.flatMap(child => walk(child, type));
  return [...(node.type === type ? [node] : []), ...walk(node.props?.children, type)];
}

test('one local draft becomes a checked saved row without creating stored empty rows', () => {
  const slots = [];
  let cursor = 0;
  let updates = 0;
  let caseData = { id: 'demo-case', insuranceCompany: 'No assigned demo agreement', partsAndLabor: { items: [], totalParts: 0, totalLabor: 0, grandTotal: 0 } };
  const react = {
    ...React,
    useContext: () => ({ user: { id: 'demo-user' } }),
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial;
      return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    },
  };
  const Section = load('src/components/sections/PartsLaborSection.tsx', { react }).default;
  function render() {
    cursor = 0;
    return Section({ caseData, onUpdate: data => { updates++; caseData = { ...caseData, ...data }; } });
  }
  const rows = () => walk(render(), 'tr').filter(row => row.props.onBlur);
  assert.equal(rows().length, 1);
  assert.equal(updates, 0);
  assert.equal(walk(render(), 'button').some(button => button.props.children === 'Add Item'), false);
  walk(rows()[0], 'select')[0].props.onChange({ target: { value: 'Windshield' } });
  rows()[0].props.onBlur();
  assert.equal(caseData.partsAndLabor.items.length, 0);
  walk(rows()[0], 'input')[0].props.onChange({ target: { value: 'DEMO-PART' } });
  walk(rows()[0], 'input')[2].props.onChange({ target: { value: '' } });
  rows()[0].props.onBlur();
  assert.equal(caseData.partsAndLabor.items.length, 0);
  assert.equal(walk(rows()[0], 'input')[2].props.value, '');
  walk(rows()[0], 'input')[2].props.onChange({ target: { value: '2500' } });
  rows()[0].props.onBlur();
  assert.equal(caseData.partsAndLabor.items.length, 1);
  assert.equal(caseData.partsAndLabor.items[0].demoAgreementCheck.status, 'review_required');
  assert.equal(caseData.partsAndLabor.grandTotal, 2500);
  assert.equal(rows().length, 2);
  rows()[1].props.onBlur();
  assert.equal(caseData.partsAndLabor.items.length, 1);
  const article = walk(rows()[0], 'input')[0];
  article.props.onChange({ target: { value: 'CHANGED' } });
  assert.equal(caseData.partsAndLabor.items[0].demoAgreementCheck, undefined);
  assert.equal(caseData.partsAndLabor.items.length, 1);
  rows()[0].props.onBlur();
  assert.equal(rows().length, 2);
  const remove = walk(rows()[0], 'button')[0];
  remove.props.onClick();
  assert.equal(caseData.partsAndLabor.items.length, 0);
  assert.equal(caseData.partsAndLabor.grandTotal, 0);
  assert.equal(rows().length, 1);
});
