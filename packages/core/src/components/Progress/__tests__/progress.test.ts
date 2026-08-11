import { describe, expect, it } from 'vitest';
import {
  clampProgressPercentage,
  formatProgressPercentage,
  isProgressPercentage,
  PROGRESS_DEFAULTS,
  progressApiContract,
  resolveProgressColor,
} from '..';

describe('Progress contract', () => {
  it('owns defaults, percentage validation and formatting', () => {
    expect(progressApiContract.defaults).toBe(PROGRESS_DEFAULTS);
    expect(isProgressPercentage(0)).toBe(true);
    expect(isProgressPercentage(100)).toBe(true);
    expect(isProgressPercentage(101)).toBe(false);
    expect(clampProgressPercentage(-5)).toBe(0);
    expect(clampProgressPercentage(105)).toBe(100);
    expect(formatProgressPercentage(42)).toBe('42%');
    expect(PROGRESS_DEFAULTS.format(42)).toBe('42%');
    expect(PROGRESS_DEFAULTS.size).toBe('medium');
  });

  it('resolves functions, strings and ordered color stops', () => {
    expect(resolveProgressColor(value => `rgb(${value} 0 0)`, 25)).toBe('rgb(25 0 0)');
    expect(resolveProgressColor('#123', 25)).toBe('#123');
    expect(resolveProgressColor('', 25)).toBeUndefined();
    expect(resolveProgressColor(['red', 'green'], 25)).toBe('red');
    expect(
      resolveProgressColor(
        [
          { color: 'green', percentage: 100 },
          { color: 'red', percentage: 50 },
        ],
        60,
      ),
    ).toBe('green');
  });
});
