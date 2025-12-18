import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { cssVariable, cssVariableKey } from '@nio-fe/shared';

export function sortDays(...days: Dayjs[]) {
  return days.sort((d1, d2) => (d1.isBefore(d2) ? -1 : 1));
}

export function sortDayRanges(...dayRanges: [Dayjs, Dayjs][]) {
  return dayRanges.sort((r1, r2) =>
    r1[0].isBefore(r2[0]) ? -1 : r1[0].isSame(r2[0]) ? (r1[1].isBefore(r2[1]) ? -1 : 1) : 1,
  );
}

export function minDayjs(...days: Dayjs[]) {
  return sortDays(...days)[0];
}

export function maxDayjs(...days: Dayjs[]) {
  const res = sortDays(...days);

  return res[res.length - 1];
}

export function onlyReserveToDay(date: Dayjs | string) {
  return dayjs(dayjs(date).format('YYYY-MM-DD'));
}

export function getIntegratedDay(date: Dayjs | string, toFloor = true) {
  const curr = dayjs(date);

  if (curr.diff(onlyReserveToDay(date), 'ms') > 0) {
    return toFloor ? onlyReserveToDay(curr) : onlyReserveToDay(curr).add(1, 'd');
  } else {
    return curr;
  }
}

export function floorDay(date: Dayjs | string) {
  return getIntegratedDay(date);
}

export function ceilDay(date: Dayjs | string) {
  return getIntegratedDay(date, false);
}

export const getMinDate = (...dates: Dayjs[]) => {
  return sortDatePos(...dates)[0];
};

export const getMaxDate = (...dates: Dayjs[]) => {
  return sortDateNeg(...dates)[0];
};

export const sortDate = <T extends Dayjs[]>(posOrNeg: 'pos' | 'neg' = 'pos', ...dates: T): T => {
  return dates.sort((a, b) => {
    if (posOrNeg === 'pos') {
      return a.isBefore(b) ? -1 : 1;
    } else {
      return a.isBefore(b) ? 1 : -1;
    }
  });
};

export const sortDatePos = <T extends Dayjs[]>(...dates: T): T => sortDate('pos', ...dates);
export const sortDateNeg = <T extends Dayjs[]>(...dates: T): T => sortDate('neg', ...dates);

export const isDatesRangeAreOverlap = (dates1: [Dayjs, Dayjs], dates2: [Dayjs, Dayjs]) => {
  const [date1Start, date1End] = sortDatePos(...dates1);
  const [date2Start, date2End] = sortDatePos(...dates2);

  return date1Start.isBefore(date2End) && date1End.isAfter(date2Start);
};

export const getDatesRangeCommonPart = (dates1: [Dayjs, Dayjs], dates2: [Dayjs, Dayjs]) => {
  if (!isDatesRangeAreOverlap(dates1, dates2)) {
    return undefined;
  }

  const [date1Start, date1End] = sortDatePos(...dates1);
  const [date2Start, date2End] = sortDatePos(...dates2);

  return [getMaxDate(date1Start, date2Start), getMinDate(date1End, date2End)];
};

export const getDatesRangeExcludeParts = (
  currentDates: [Dayjs, Dayjs],
  payloadDates: [Dayjs, Dayjs],
) => {
  if (!isDatesRangeAreOverlap(currentDates, payloadDates)) {
    return [currentDates];
  }

  const [currentDatesStart, currentDatesEnd] = sortDatePos(...currentDates);
  const [payloadDatesStart, payloadDatesEnd] = sortDatePos(...payloadDates);

  if (
    currentDatesStart.isSameOrAfter(payloadDatesStart) &&
    currentDatesEnd.isSameOrBefore(payloadDatesEnd)
  ) {
    return undefined;
  } else if (
    currentDatesStart.isBefore(payloadDatesStart) &&
    currentDatesEnd.isAfter(payloadDatesEnd)
  ) {
    return [
      [currentDatesStart, payloadDatesStart],
      [payloadDatesEnd, currentDatesEnd],
    ];
  } else if (currentDatesStart.isBefore(payloadDatesStart)) {
    return [[currentDatesStart, payloadDatesStart]];
  } else {
    return [[payloadDatesEnd, currentDatesEnd]];
  }
};

export const isDatesAreCrossDay = (date1: Dayjs, date2: Dayjs) => {
  return Math.abs(date1.startOf('day').diff(date2.startOf('day'), 'day')) >= 1;
};

export const calculateDisabledHours = (currDate: Dayjs, hourRanges: [Dayjs, Dayjs][]) => {
  const res: [Dayjs, Dayjs][] = [];

  hourRanges.forEach(([currStart, currEnd]) => {
    const foundInRanges = res.filter(
      ([start, end]) => end.isSameOrAfter(currStart) && start.isSameOrBefore(currEnd),
    );

    if (!foundInRanges.length) {
      res.push([currStart, currEnd]);
    } else {
      foundInRanges.forEach(range => {
        const index = res.indexOf(range);
        res.splice(index, 1);
      });

      const min = minDayjs(...foundInRanges.map(curr => curr[0]), currStart);
      const max = maxDayjs(...foundInRanges.map(curr => curr[1]), currEnd);

      res.push([min, max]);
    }
  });

  return sortDayRanges(...res);
};

export function getOneHourHeightPx() {
  return parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      cssVariableKey('calendar-height--week--hour-cell'),
    ),
  );
}

export function getOneHourHeightCssRaw() {
  return cssVariable('calendar-height--week--hour-cell');
}

export function getOneSecondsHeightCssRaw() {
  return `calc(${getOneHourHeightCssRaw()} / 3600)`;
}

export function getHeightCssRaw(seconds: number) {
  return `calc(${getOneSecondsHeightCssRaw()} * ${seconds})`;
}

export function getHoursDiffCssRaw(start: Dayjs, end: Dayjs) {
  return getHeightCssRaw(Math.abs(start.diff(end, 'seconds')));
}

export function getHourStartCssRaw(start: Dayjs) {
  return getHeightCssRaw(start.diff(start.startOf('d'), 'seconds'));
}
