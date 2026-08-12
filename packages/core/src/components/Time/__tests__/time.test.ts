import { describe, expect, it } from 'vitest';
import {
  formatTimeParts,
  isTimeValue,
  normalizeTimeValue,
  resolveTimeDurationSeconds,
  splitTimeDuration,
  TIME_DEFAULTS,
  timeManifest,
} from '..';

describe('Time contract', () => {
  it('normalizes supported values', () => {
    expect(TIME_DEFAULTS).toEqual({ time: 10, endTime: 0, forward: false, calculative: false });
    expect(normalizeTimeValue(10)).toBe(10_000);
    expect(normalizeTimeValue(1_000_000_000_000)).toBe(1_000_000_000_000);
    expect(isTimeValue('10')).toBe(true);
    expect(isTimeValue('invalid')).toBe(false);
  });
  it('resolves public duration modes', () => {
    expect(resolveTimeDurationSeconds({ time: 10 }, 5_000)).toBe(10);
    expect(resolveTimeDurationSeconds({ endTime: 20 }, 5_000)).toBe(15);
    expect(resolveTimeDurationSeconds({ time: 10, endTime: 15, calculative: true })).toBe(5);
  });
  it('splits and formats durations', () => {
    expect(splitTimeDuration(90_061)).toEqual({ dd: 1, hh: 1, mm: 1, ss: 1 });
    expect(formatTimeParts({ hh: 1, mm: 2, ss: 3 })).toBe('01:02:03');
    expect(timeManifest.contract.slots.map(slot => slot.name)).toEqual(['content']);
  });
});
