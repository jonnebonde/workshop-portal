import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { webcrypto } from 'node:crypto';
import { buildSync } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

globalThis.crypto ??= webcrypto;
const require = createRequire(import.meta.url);
function load(file) {
  const result = buildSync({ entryPoints: [file], bundle: true, write: false, format: 'cjs', platform: 'node', packages: 'external', jsx: 'automatic' });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(require, module, module.exports);
  return module.exports;
}
const { createCaseComment, splitCaseCommunication, hasUnreadEntries } = load('src/utils/caseCommunication.ts');
const { default: Communication } = load('src/components/sections/CommunicationLogSection.tsx');
const entry = (id, actionType, actorType = 'system') => ({ id, actionType, actorType, actor: 'Demo actor', description: id, timestamp: '2026-11-02T10:00:00Z' });

test('comments and events partition without losing or reclassifying legacy entries', () => {
  const entries = [entry('event', 'file_uploaded'), entry('comment', 'comment_added', 'agent'), entry('legacy', 'other', 'workshop'), entry('note', 'note_added', 'agent')];
  const before = JSON.stringify(entries);
  const { comments, activity } = splitCaseCommunication(entries);
  assert.deepEqual(comments.map(item => item.id), ['comment']);
  assert.deepEqual(activity.map(item => item.id), ['event', 'legacy', 'note']);
  assert.equal(comments.length + activity.length, entries.length);
  assert.equal(JSON.stringify(entries), before);
});

test('empty comments are rejected; new comments have unique identity and preserve line breaks', () => {
  assert.equal(createCaseComment('  \n ', 'Demo user'), null);
  const comment = createCaseComment(' First line\nSecond line ', 'Demo user');
  assert.equal(comment.description, 'First line\nSecond line');
  assert.equal(comment.actionType, 'comment_added');
  assert.equal(comment.actor, 'Demo user');
  assert.equal(comment.actorType, 'workshop');
  assert.notEqual(comment.id, createCaseComment('Other', 'Demo user').id);
  assert.ok(Number.isFinite(Date.parse(comment.timestamp)));
});

test('comments and activity track unread state independently and ignore own comments', () => {
  const { comments, activity } = splitCaseCommunication([entry('comment', 'comment_added', 'agent'), entry('event', 'file_uploaded')]);
  assert.equal(hasUnreadEntries(comments), true);
  assert.equal(hasUnreadEntries(comments, '2026-11-02T11:00:00Z'), false);
  assert.equal(hasUnreadEntries(activity), true);
  assert.equal(hasUnreadEntries([entry('own', 'comment_added', 'workshop')]), false);
  assert.equal(hasUnreadEntries([]), false);
});

test('two separate panels expose a comment input and preserve event text', () => {
  const caseData = { id: 'demo-case', actionLog: [entry('Example event', 'file_uploaded'), entry('Example comment', 'comment_added', 'agent')] };
  const html = renderToStaticMarkup(React.createElement(Communication, { caseData, onUpdate() {} }));
  const [comments, activity] = html.split('id="communication-log"');
  assert.match(comments, /Comments/);
  assert.match(comments, /Example comment/);
  assert.doesNotMatch(comments, /Example event/);
  assert.match(comments, /aria-label="Comment"/);
  assert.match(comments, /disabled=""/);
  assert.match(activity, /Activity log/);
  assert.match(activity, /Example event/);
  assert.doesNotMatch(activity, /<textarea|Example comment/);
});
