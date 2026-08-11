import { describe, expect, test } from 'vitest';
import dayjs from '~/utils/useDayJs';
import {
  getCompareUnitByType,
  mergeDateTime,
  onlyCloneTime,
  sortDayjs,
  tryToAnalysisDate,
} from '../src/utils/useDayjs';
import { transformType } from '../src/utils/utils';

describe('DatePicker date utilities', () => {
  test.each([
    ['dateminutes', 'date-minutes'],
    ['dateseconds', 'date-seconds'],
    ['daterange', 'date-range'],
    ['datetimerange', 'datetime-range'],
    ['dateminutesrange', 'date-minutes-range'],
    ['datesecondsrange', 'date-seconds-range'],
    ['monthrange', 'month-range'],
    ['yearrange', 'year-range'],
    ['week', 'week'],
  ] as const)('normalizes %s to %s', (input, output) => {
    expect(transformType(input as never)).toBe(output);
  });

  test.each([
    ['year', 'year'],
    ['year-range', 'year'],
    ['month', 'month'],
    ['month-range', 'month'],
    ['date', 'date'],
    ['date-range', 'date'],
    ['week', 'date'],
    ['datetime', 'minutes'],
    ['date-minutes', 'minutes'],
    ['datetime-range', 'minutes'],
    ['date-minutes-range', 'minutes'],
    ['date-seconds', 'seconds'],
    ['date-seconds-range', 'seconds'],
  ] as const)('maps %s comparisons to %s', (type, unit) => {
    expect(getCompareUnitByType(type as never)).toBe(unit);
  });

  test('merges date and time while preserving missing values', () => {
    const date = dayjs('2026-08-10 01:02:03');
    const time = dayjs('2000-01-01 14:35:59');
    expect(mergeDateTime(date, time)?.format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2026-08-10 14:35:59',
    );
    expect(mergeDateTime(date, null)?.isSame(date)).toBe(true);
    expect(mergeDateTime(null, time)).toBeUndefined();
    expect(onlyCloneTime(time)?.format('HH:mm:ss')).toBe('14:35:59');
    expect(onlyCloneTime(undefined)).toBeUndefined();
  });

  test('strictly parses input then falls back for supported external values', () => {
    expect(tryToAnalysisDate(null, 'YYYY-MM-DD', undefined)).toBeNull();
    expect(tryToAnalysisDate('', 'YYYY-MM-DD', undefined)).toBeUndefined();
    expect(tryToAnalysisDate('2026-08-10', 'YYYY-MM-DD', null)?.isValid()).toBe(true);
    expect(tryToAnalysisDate('August 10 2026', 'YYYY-MM-DD', null)?.isValid()).toBe(true);
    expect(tryToAnalysisDate(1_786_291_200_000, 'x', null)?.isValid()).toBe(true);
    const source = dayjs('2026-08-10');
    expect(tryToAnalysisDate(source, 'YYYY-MM-DD', null)?.isSame(source)).toBe(true);
  });

  test('sorts valid endpoints and keeps partial ranges stable', () => {
    const first = dayjs('2026-01-01');
    const last = dayjs('2026-12-31');
    expect(sortDayjs(first, last)).toBe(-1);
    expect(sortDayjs(last, first)).toBe(1);
    expect(sortDayjs(first, undefined)).toBe(0);
  });
});
