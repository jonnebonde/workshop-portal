import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { buildSync } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);

function loadSource(file) {
  const build = buildSync({
    entryPoints: [file],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    packages: 'external',
    jsx: 'automatic',
  });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', build.outputFiles[0].text)(require, module, module.exports);
  return module.exports;
}

const { getCalibrationRequirement, getCalibrationState } = loadSource('src/utils/calibration.ts');
const { hasCalibrationComplete, getCalibrationApprovalStatus, getMissingRequirementsForCompletion, getCases } = loadSource('src/data/mockData.ts');
const CalibrationSection = loadSource('src/components/sections/CalibrationSection.tsx').default;
const completedWork = { confirmed: true, signature: 'Workshop Technician', files: [{ id: 'report', name: 'report.pdf', url: '/report.pdf' }] };

function caseWith(calibration, extra = {}) {
  return { ...getCases()[0], calibration, calibrationApprovalStatus: undefined, ...extra };
}

function render(calibration, extra = {}) {
  return renderToStaticMarkup(React.createElement(CalibrationSection, {
    caseData: caseWith(calibration),
    onUpdate() {},
    onFileUpload() {},
    ...extra,
  }));
}

test('API yes, Possible and No are recognized alongside existing booleans', () => {
  for (const [value, expected] of [[true, 'yes'], [false, 'no'], ['yes', 'yes'], ['Possible', 'possible'], ['No', 'no'], ['possible', 'possible'], ['no', 'no']]) {
    assert.equal(getCalibrationRequirement({ pidRequiresCalibration: value }), expected);
    assert.equal(getCalibrationRequirement({ arRequiresCalibration: value }), expected);
  }
  assert.equal(getCalibrationRequirement({ required: true }), 'yes');
  assert.equal(hasCalibrationComplete(undefined), false);
});

test('a definite requirement takes priority over Possible; Possible takes priority over No', () => {
  assert.equal(getCalibrationRequirement({ pidRequiresCalibration: 'Possible', arRequiresCalibration: true }), 'yes');
  assert.equal(getCalibrationRequirement({ pidRequiresCalibration: false, arRequiresCalibration: 'Possible' }), 'possible');
});

test('Possible stays incomplete until the workshop inspects and chooses, even with previous files or approval', () => {
  const calibration = { pidRequiresCalibration: 'Possible', ...completedWork, workshopRequiresCalibration: false };
  assert.equal(getCalibrationState(calibration).needsAssessment, true);
  assert.equal(hasCalibrationComplete(caseWith(calibration)), false);
  assert.equal(getCalibrationApprovalStatus(caseWith(calibration, { calibrationApprovalStatus: 'approved' })), 'incomplete');
  assert.ok(getMissingRequirementsForCompletion(caseWith(calibration)).includes('Inspect the vehicle and confirm whether calibration is required'));
});

test('Possible followed by not required completes the section without a reason, signature or files', () => {
  const calibration = { pidRequiresCalibration: 'Possible', workshopAssessment: 'not_required' };
  assert.equal(hasCalibrationComplete(caseWith(calibration)), true);
  assert.equal(getCalibrationApprovalStatus(caseWith(calibration)), 'ready_for_approval');
  assert.equal(getCalibrationState(calibration).needsOverrideReason, false);
  assert.equal(calibration.pidRequiresCalibration, 'Possible');
});

test('Possible followed by required needs documentation, confirmation and a signature', () => {
  const calibration = { pidRequiresCalibration: 'Possible', workshopAssessment: 'required' };
  assert.equal(hasCalibrationComplete(caseWith(calibration)), false);
  assert.equal(hasCalibrationComplete(caseWith({ ...calibration, ...completedWork })), true);
  for (const missingField of [{ files: [] }, { confirmed: false }, { signature: '   ' }]) {
    assert.equal(hasCalibrationComplete(caseWith({ ...calibration, ...completedWork, ...missingField })), false);
  }
});

test('changing a not-required assessment to required makes the section incomplete', () => {
  const calibration = { arRequiresCalibration: 'Possible', workshopAssessment: 'not_required' };
  assert.equal(hasCalibrationComplete(caseWith(calibration)), true);
  assert.equal(hasCalibrationComplete(caseWith({ ...calibration, workshopAssessment: 'required' })), false);
});

test('existing Yes/No workshop overrides retain their completion rules', () => {
  assert.equal(hasCalibrationComplete(caseWith({ pidRequiresCalibration: 'No' })), true);
  assert.equal(hasCalibrationComplete(caseWith({ pidRequiresCalibration: 'No', workshopRequiresCalibration: true })), false);
  assert.equal(hasCalibrationComplete(caseWith({ pidRequiresCalibration: 'yes', workshopDisagrees: true })), false);
  assert.equal(hasCalibrationComplete(caseWith({ pidRequiresCalibration: 'yes', workshopDisagrees: true, comment: 'Inspection result' })), true);
  assert.equal(hasCalibrationComplete(caseWith({ pidRequiresCalibration: true, ...completedWork })), true);
});

test('Possible presents inspection guidance and two unselected options; no premature calibration form', () => {
  const html = render({ pidRequiresCalibration: 'Possible' }, { approvalStatus: 'approved' });
  assert.match(html, /Calibration may be required/);
  assert.match(html, /What did the vehicle inspection show/);
  assert.match(html, /Awaiting vehicle inspection/);
  assert.equal((html.match(/type="radio"/g) || []).length, 2);
  assert.doesNotMatch(html, /checked=""/);
  assert.doesNotMatch(html, /Calibration details/);
  assert.doesNotMatch(html, /Calibration is marked as not required/);
  assert.match(html, /Incomplete/);
});

test('the required choice reveals the existing documentation and signature workflow', () => {
  const html = render({ pidRequiresCalibration: 'Possible', workshopAssessment: 'required' });
  assert.match(html, /Calibration details/);
  assert.match(html, /id="calibrationSignature"/);
  assert.match(html, /id="calibrationConfirmation"/);
  assert.match(html, /Next: complete the calibration details below/);
});

test('the not-required choice records the decision with no additional mandatory fields', () => {
  const html = render({ pidRequiresCalibration: 'Possible', workshopAssessment: 'not_required' });
  assert.match(html, /Assessment recorded: calibration is not required/);
  assert.doesNotMatch(html, /<textarea/);
  assert.doesNotMatch(html, /type="file"/);
  assert.doesNotMatch(html, /id="calibrationSignature"/);
});
