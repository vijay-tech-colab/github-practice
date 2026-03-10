import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPrompt } from '../src/cli.js';

test('buildPrompt joins prompt parts into a single string', () => {
  assert.equal(buildPrompt(['hello', 'gemini']), 'hello gemini');
});

test('buildPrompt trims whitespace from the result', () => {
  assert.equal(buildPrompt(['  hello', 'world  ']), 'hello world');
});
