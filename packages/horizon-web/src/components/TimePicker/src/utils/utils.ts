import { isNil, isNumber, isString } from '@aurora/shared';
import dayjs from '~/utils/useDayJs';
import type { ConfigType } from 'dayjs';

export function tryToAnalysisTime(
  time: ConfigType,
  format: string,
  defaultValue: null | undefined,
) {
  if (isNil(time)) {
    return time;
  } else if (!time) {
    return defaultValue;
  } else if (isString(time) || isNumber(time)) {
    return dayjs(time, format);
  } else {
    return dayjs(time);
  }
}
