import dayjs, { type Dayjs, isDayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import arraySupport from 'dayjs/plugin/arraySupport';
import toObject from 'dayjs/plugin/toObject';
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import objectSupport from 'dayjs/plugin/objectSupport';
import minMax from 'dayjs/plugin/minMax';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/nb';
import 'dayjs/locale/de';
import 'dayjs/locale/en-sg';
import 'dayjs/locale/sv';
import 'dayjs/locale/se';

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(arraySupport);
dayjs.extend(weekYear);
dayjs.extend(weekOfYear);
dayjs.extend(toObject);
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.extend(minMax);
dayjs.extend(localizedFormat);

const currDayjs = dayjs;

declare module 'dayjs' {
  interface DayjsObject {
    years: number;
    months: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  }
}

export type SingleOrArrayPickerDataType<T> = T | [T, T];

export default currDayjs;

export function isDayjsEqual<
  T extends SingleOrArrayPickerDataType<Dayjs | string | undefined | null>,
>(date1: T, date2: T): boolean {
  if (Array.isArray(date1) && Array.isArray(date2)) {
    return isDayjsEqual(date1[0], date2[0]) && isDayjsEqual(date1[1], date2[1]);
  } else if (isDayjs(date1) && isDayjs(date2)) {
    return date1.isSame(date2, 'seconds');
  } else {
    return date1 === date2;
  }
}
