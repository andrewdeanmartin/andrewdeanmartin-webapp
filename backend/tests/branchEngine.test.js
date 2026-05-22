import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyBranch, extractSignalsFromAnswers, pickThreeToStart } from '../src/services/branchEngine.js';

test('classifyBranch A when high RFP and growth ambition', () => {
  const signals = { rfp_pct: 25, ambition: 'growth', retained_clients: 10, talent_count: 200, pain: 'ops', talent_ai_tolerance: 'cautious' };
  const result = classifyBranch(signals);
  assert.equal(result.branch, 'A');
});

test('classifyBranch D when open talent AI and large roster', () => {
  const signals = { rfp_pct: 5, ambition: 'growth', retained_clients: 10, talent_count: 600, pain: 'talent', talent_ai_tolerance: 'open' };
  const result = classifyBranch(signals);
  assert.equal(result.branch, 'D');
});

test('classifyBranch B as default', () => {
  const signals = { rfp_pct: 5, ambition: 'lifestyle', retained_clients: 5, talent_count: 100, pain: 'ops', talent_ai_tolerance: 'cautious' };
  const result = classifyBranch(signals);
  assert.equal(result.branch, 'B');
});

test('extractSignalsFromAnswers parses brenda RFP percent', () => {
  const answers = [{ questionId: 'brenda-1', rawAnswer: 'About 30% from RFP channels' }];
  const signals = extractSignalsFromAnswers(answers);
  assert.equal(signals.rfp_pct, 30);
});

test('pickThreeToStart returns three items', () => {
  const picks = pickThreeToStart('B', { talent_ai_tolerance: 'cautious' }, {});
  assert.equal(picks.length, 3);
  assert.ok(picks[0].useCaseId);
});
