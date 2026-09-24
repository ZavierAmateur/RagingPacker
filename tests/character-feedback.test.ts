import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  CHARACTER_EXPRESSION_PAGES,
  CHARACTER_FEEDBACK_CUES,
  characterFeedbackFor,
  feedbackEventForItemPick,
  feedbackEventForPackage,
  feedbackEventForTimer,
  shouldReplaceCharacterFeedback,
} from '../assets/scripts/CharacterFeedback.ts';

test('feedback contract covers all eight FairyGUI expression pages', () => {
  const used = new Set(Object.values(CHARACTER_FEEDBACK_CUES).map((cue) => cue.expression));
  assert.deepEqual([...used].sort(), [...CHARACTER_EXPRESSION_PAGES].sort());
});

test('TypeScript expression names stay aligned with the FairyGUI controller', () => {
  const xml = readFileSync(
    new URL('../fairygui/assets/ui-game/components/CharacterPortrait.xml', import.meta.url),
    'utf8',
  );
  const pages = xml.match(/controller name="expression" pages="([^"]+)"/)?.[1];
  assert.ok(pages, 'CharacterPortrait.expression controller is missing');
  const names = pages.split(',').filter((_, index) => index % 2 === 1);
  assert.deepEqual(names, [...CHARACTER_EXPRESSION_PAGES]);
});

test('item feedback distinguishes correct, wrong and full-box picks', () => {
  assert.equal(feedbackEventForItemPick(true, true), 'correctItem');
  assert.equal(feedbackEventForItemPick(false, true), 'wrongItem');
  assert.equal(feedbackEventForItemPick(true, false), 'boxFull');
});

test('timer warning uses a bounded quarter-time threshold', () => {
  assert.equal(feedbackEventForTimer(9, 30), null);
  assert.equal(feedbackEventForTimer(8, 30), 'timeWarning');
  assert.equal(feedbackEventForTimer(4, 12), 'timeWarning');
  assert.equal(feedbackEventForTimer(0, 30), 'timeout');
});

test('package outcome escalates from success to complaint and failure', () => {
  assert.equal(feedbackEventForPackage({ perfect: true, complaint: false, timeout: false, complaintsAfter: 0 }), 'perfectOrder');
  assert.equal(feedbackEventForPackage({ perfect: false, complaint: true, timeout: false, complaintsAfter: 1 }), 'complaint');
  assert.equal(feedbackEventForPackage({ perfect: false, complaint: true, timeout: false, complaintsAfter: 2 }), 'criticalComplaint');
  assert.equal(feedbackEventForPackage({ perfect: false, complaint: true, timeout: false, complaintsAfter: 3 }), 'dayFailed');
  assert.equal(feedbackEventForPackage({ perfect: false, complaint: false, timeout: true, complaintsAfter: 0 }), 'timeout');
});

test('non-interruptible result feedback rejects lower-priority noise', () => {
  const success = characterFeedbackFor('perfectOrder');
  const correctItem = characterFeedbackFor('correctItem');
  const failed = characterFeedbackFor('dayFailed');
  assert.equal(shouldReplaceCharacterFeedback(success, correctItem), false);
  assert.equal(shouldReplaceCharacterFeedback(success, failed), true);
});
