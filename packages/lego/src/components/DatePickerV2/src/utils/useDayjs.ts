import type { Dayjs } from 'dayjs';
import dayjs from '~/utils/useDayJs';
import type { NDatePickerV2AccessDatetimeType } from './types';
import { isNil, isNumber, isString } from '@nio-fe/shared';

export function mergeDateTime(date: Dayjs | undefined | null, time: Dayjs | undefined | null) {
  return date
    ? time
      ? date.set('hour', time.hour()).set('minute', time.minute()).set('second', time.second())
      : date
    : undefined;
}

export function onlyCloneTime(datetime: Dayjs | undefined | null) {
  return datetime && dayjs(datetime.format('HH:mm:ss'), 'HH:mm:ss');
}

export function tryToAnalysisDate(
  date: NDatePickerV2AccessDatetimeType,
  format: string,
  defaultValue: null | undefined,
) {
  if (isNil(date)) {
    return date;
  } else if (!date) {
    return defaultValue;
  } else if (isString(date) || isNumber(date)) {
    const dateByFormat = dayjs(date, format, true);
    // If the date from user enter is not valid strictly, return the dayjs default analysis.
    return dateByFormat.isValid() ? dateByFormat : dayjs(date);
  } else {
    return dayjs(date);
  }
}

export function sortDayjs(a: Dayjs | undefined | null, b: Dayjs | undefined | null) {
  if (!a || !b) {
    return 0;
  } else {
    return a.isBefore(b) ? -1 : 1;
  }
}
