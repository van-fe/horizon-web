import { describe, expect, test } from 'vitest';
import {
  createTimeSelectOptions,
  isTimeSelectClockValue,
  isTimeSelectStep,
  parseTimeSelectMinutes,
} from '..';

describe('TimeSelect Core', () => {
  test('validates and parses clock values', () => {
    expect(isTimeSelectClockValue('23:59')).toBe(true);
    expect(isTimeSelectClockValue('24:00')).toBe(false);
    expect(isTimeSelectStep('00:00')).toBe(false);
    expect(parseTimeSelectMinutes('08:30')).toBe(510);
    expect(parseTimeSelectMinutes('oops')).toBeUndefined();
  });

  test('creates bounded options and optionally includes an unaligned end', () => {
    expect(
      createTimeSelectOptions({
        start: '08:30',
        end: '09:20',
        step: '00:30',
        includeEndTime: true,
        minTime: '09:00',
        maxTime: '09:20',
        format: minutes => `minute-${minutes}`,
      }),
    ).toEqual([
      { value: '08:30', label: 'minute-510', disabled: true },
      { value: '09:00', label: 'minute-540', disabled: false },
      { value: '09:20', label: 'minute-560', disabled: false },
    ]);
  });

  test.each([
    { start: 'bad', end: '10:00', step: '00:30' },
    { start: '10:00', end: '09:00', step: '00:30' },
    { start: '09:00', end: '10:00', step: '00:00' },
  ])('returns no options for invalid ranges', input => {
    expect(createTimeSelectOptions({ ...input, includeEndTime: false })).toEqual([]);
  });
});
