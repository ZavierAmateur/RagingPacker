export const CHARACTER_EXPRESSION_PAGES = [
  'calm',
  'tired',
  'focused',
  'suspicious',
  'irritated',
  'rage',
  'success',
  'failed',
] as const;

export type CharacterExpression = typeof CHARACTER_EXPRESSION_PAGES[number];

export type CharacterFeedbackEvent =
  | 'orderReady'
  | 'correctItem'
  | 'wrongItem'
  | 'packageMismatch'
  | 'boxFull'
  | 'timeWarning'
  | 'perfectOrder'
  | 'complaint'
  | 'criticalComplaint'
  | 'timeout'
  | 'dayFailed';

export type CharacterMotion =
  | 'settle'
  | 'droop'
  | 'nod'
  | 'questionPop'
  | 'shakeSmall'
  | 'shakeStrong'
  | 'bounce'
  | 'sink';

export interface CharacterFeedbackCue {
  event: CharacterFeedbackEvent;
  expression: CharacterExpression;
  motion: CharacterMotion;
  holdMs: number;
  priority: number;
  interruptible: boolean;
  returnTo: CharacterExpression | null;
}

export interface PackageFeedbackInput {
  perfect: boolean;
  complaint: boolean;
  timeout: boolean;
  complaintsAfter: number;
}

export const CHARACTER_FEEDBACK_CUES: Readonly<Record<CharacterFeedbackEvent, CharacterFeedbackCue>> = {
  orderReady: {
    event: 'orderReady', expression: 'calm', motion: 'settle', holdMs: 0,
    priority: 0, interruptible: true, returnTo: null,
  },
  correctItem: {
    event: 'correctItem', expression: 'focused', motion: 'nod', holdMs: 420,
    priority: 1, interruptible: true, returnTo: 'calm',
  },
  wrongItem: {
    event: 'wrongItem', expression: 'suspicious', motion: 'questionPop', holdMs: 900,
    priority: 2, interruptible: true, returnTo: 'calm',
  },
  packageMismatch: {
    event: 'packageMismatch', expression: 'suspicious', motion: 'questionPop', holdMs: 900,
    priority: 2, interruptible: true, returnTo: 'calm',
  },
  boxFull: {
    event: 'boxFull', expression: 'irritated', motion: 'shakeSmall', holdMs: 720,
    priority: 3, interruptible: true, returnTo: 'calm',
  },
  timeWarning: {
    event: 'timeWarning', expression: 'tired', motion: 'droop', holdMs: 0,
    priority: 2, interruptible: true, returnTo: null,
  },
  perfectOrder: {
    event: 'perfectOrder', expression: 'success', motion: 'bounce', holdMs: 1_100,
    priority: 5, interruptible: false, returnTo: 'calm',
  },
  complaint: {
    event: 'complaint', expression: 'rage', motion: 'shakeStrong', holdMs: 1_100,
    priority: 6, interruptible: false, returnTo: 'calm',
  },
  criticalComplaint: {
    event: 'criticalComplaint', expression: 'rage', motion: 'shakeStrong', holdMs: 1_450,
    priority: 7, interruptible: false, returnTo: 'irritated',
  },
  timeout: {
    event: 'timeout', expression: 'failed', motion: 'sink', holdMs: 1_300,
    priority: 8, interruptible: false, returnTo: 'tired',
  },
  dayFailed: {
    event: 'dayFailed', expression: 'failed', motion: 'sink', holdMs: 0,
    priority: 9, interruptible: false, returnTo: null,
  },
};

export function characterFeedbackFor(event: CharacterFeedbackEvent): CharacterFeedbackCue {
  return CHARACTER_FEEDBACK_CUES[event];
}

export function feedbackEventForItemPick(isRequested: boolean, fitsBox: boolean): CharacterFeedbackEvent {
  if (!fitsBox) return 'boxFull';
  return isRequested ? 'correctItem' : 'wrongItem';
}

export function feedbackEventForTimer(secondsLeft: number, initialSeconds: number): CharacterFeedbackEvent | null {
  if (secondsLeft <= 0) return 'timeout';
  const warningAt = Math.min(8, Math.max(4, Math.ceil(initialSeconds * 0.25)));
  return secondsLeft <= warningAt ? 'timeWarning' : null;
}

export function feedbackEventForPackage(input: PackageFeedbackInput): CharacterFeedbackEvent {
  if (input.timeout) return 'timeout';
  if (input.perfect) return 'perfectOrder';
  if (input.complaint && input.complaintsAfter >= 3) return 'dayFailed';
  if (input.complaint && input.complaintsAfter === 2) return 'criticalComplaint';
  return input.complaint ? 'complaint' : 'packageMismatch';
}

export function shouldReplaceCharacterFeedback(
  current: CharacterFeedbackCue | null,
  next: CharacterFeedbackCue,
): boolean {
  if (!current) return true;
  if (!current.interruptible && next.priority < current.priority) return false;
  return next.priority >= current.priority || current.interruptible;
}
