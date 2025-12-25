import type { CalendarProps } from '../composables/useProps';
import type { HCalendarPinFlag } from './types';
import dayjs, { type Dayjs } from 'dayjs';
import { ref, unref } from 'vue';
import { nanoid } from 'nanoid';
import type { MaybeRef } from '@aurora/utils';
import { EventEmitter } from '@aurora/utils';
import type { UnwrapRef } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import {
  ceilDay,
  floorDay,
  getMaxDate,
  getMinDate,
  isDatesRangeAreOverlap,
  maxDayjs,
  minDayjs,
} from './timeHelper';

export interface HCalendarMergedPinFlags {
  startAt: Dayjs;
  endAt: Dayjs;
  pinFlags: HCalendarPinFlag[];
}

export default class PinFlagsHelper {
  public pinFlags = ref<HCalendarPinFlag[]>([]);
  private _pinFlags = ref<HCalendarPinFlag[]>([]);
  public flagsInWeekdays = ref(new Map<number, HCalendarPinFlag[][]>());
  public flagsInDays = ref(new Map<number, HCalendarPinFlag[][]>());
  public mergedFlags = ref<HCalendarMergedPinFlags[]>([]);
  public groupedMergedFlags = ref(
    new Map<
      string,
      {
        isStart: boolean;
        isEnd: boolean;
        mergedFlags: HCalendarMergedPinFlags;
      }
    >(),
  );

  private _props: CalendarProps;
  private _eventEmitter = new EventEmitter();

  constructor(pinFlags: HCalendarPinFlag[], props: CalendarProps) {
    this._props = props;
    this.updateData(pinFlags);
  }

  public addEventListener<T extends keyof PinFlagsHelper>(
    key: T,
    watchCallback: (val: UnwrapRef<PinFlagsHelper[T]>) => void,
  ) {
    this._eventEmitter.on(key, watchCallback);
  }

  public removeEventListener<T extends keyof PinFlagsHelper>(
    key: T,
    watchCallback: (val: UnwrapRef<PinFlagsHelper[T]>) => void,
  ) {
    this._eventEmitter.off(key, watchCallback);
  }

  private emitEvent(key: keyof PinFlagsHelper) {
    switch (key) {
      case 'pinFlags':
        this._eventEmitter.emit(key, this.pinFlags.value);
        break;
      default:
        this._eventEmitter.emit(key, unref(this[key] as MaybeRef<unknown>));
        break;
    }
  }

  public updateData(pinFlags: HCalendarPinFlag[]) {
    this.pinFlags.value = pinFlags;
    this._pinFlags.value = cloneDeep(pinFlags)
      .map(flag => ({
        _uuid: nanoid(),
        ...flag,
        _startAt: dayjs(flag.startAt),
        _endAt: dayjs(
          flag.endAt || dayjs(dayjs(flag.startAt).format('YYYY-MM-DD')).add(86400, 'seconds'),
        ),
      }))
      .sort((a, b) =>
        a._startAt.isBefore(b._startAt)
          ? -1
          : a._startAt.isSame(b._startAt)
            ? a._endAt.isAfter(b._endAt)
              ? -1
              : 1
            : 1,
      );

    this.emitEvent('pinFlags');
    this.calculateFlagsInWeekdays();
    this.calculateFlagsInDays();
    this.calculateMergedFlags();
  }

  public calculateFlagsInWeekdays() {
    this.flagsInWeekdays.value.clear();
    if (!this._pinFlags.value.length) return;

    const minDate = getMinDate(...this._pinFlags.value.map(flag => flag._startAt!)).day(0);
    const maxDate = getMaxDate(...this._pinFlags.value.map(flag => flag._endAt!));

    for (let i = minDate; i.isBefore(maxDate); i = i.add(7, 'days')) {
      const lastDate = i.day(6).endOf('day');
      const flags: HCalendarPinFlag[][] = [];
      this._pinFlags.value
        .filter(flag => isDatesRangeAreOverlap([flag._startAt!, flag._endAt!], [i, lastDate]))
        .forEach(flag => {
          const index = flags.findIndex(
            row =>
              !row.some(curr =>
                isDatesRangeAreOverlap(
                  [curr._startAt!, curr._endAt!],
                  [flag._startAt!, flag._endAt!],
                ),
              ),
          );

          if (index === -1) {
            flags.push([flag]);
          } else {
            flags[index].push(flag);
          }
        });

      this.flagsInWeekdays.value.set(i.unix(), flags);
    }

    this.emitEvent('flagsInWeekdays');
  }

  public calculateFlagsInDays() {
    this.flagsInDays.value.clear();
    if (!this._pinFlags.value.length) return;

    const minDate = getMinDate(...this._pinFlags.value.map(flag => flag._startAt!)).startOf('day');
    const maxDate = getMaxDate(...this._pinFlags.value.map(flag => flag._endAt!));

    for (let i = minDate; i.isBefore(maxDate); i = i.add(1, 'days')) {
      const lastTime = i.endOf('day');
      const flags: HCalendarPinFlag[][] = [];
      this._pinFlags.value
        .filter(flag => isDatesRangeAreOverlap([flag._startAt!, flag._endAt!], [i, lastTime]))
        .forEach(flag => {
          const index = flags.findIndex(
            row =>
              !row.some(curr =>
                isDatesRangeAreOverlap(
                  [curr._startAt!, curr._endAt!],
                  [flag._startAt!, flag._endAt!],
                ),
              ),
          );

          if (index === -1) {
            flags.push([flag]);
          } else {
            flags[index].push(flag);
          }
        });

      this.flagsInDays.value.set(i.unix(), flags);
    }

    this.emitEvent('flagsInDays');
  }

  public calculateMergedFlags() {
    this.mergedFlags.value = [];
    this._pinFlags.value.forEach(flag => {
      const foundMergedFlags = this.mergedFlags.value.filter(
        curr => curr.startAt.isBefore(flag._endAt!) && curr.endAt.isAfter(flag._startAt!),
      );

      if (!foundMergedFlags.length) {
        this.mergedFlags.value.push({
          startAt: flag._startAt!,
          endAt: flag._endAt!,
          pinFlags: [flag],
        });
      } else {
        const insertTarget: HCalendarMergedPinFlags = {
          startAt: dayjs(minDayjs(flag._startAt!, ...foundMergedFlags.map(flag => flag.startAt))),
          endAt: dayjs(maxDayjs(flag._endAt!, ...foundMergedFlags.map(flag => flag.endAt))),
          pinFlags: [flag].concat(...foundMergedFlags.map(flag => flag.pinFlags)),
        };

        this.mergedFlags.value.push(insertTarget);

        foundMergedFlags.forEach(mergedFlag => {
          const index = this.mergedFlags.value.indexOf(mergedFlag);

          this.mergedFlags.value.splice(index, 1);
        });
      }

      this.mergedFlags.value.sort((a, b) => (a.startAt.isBefore(b.startAt) ? -1 : 1));
    });

    this.emitEvent('mergedFlags');
    this.groupedMergeFlag();
  }

  public groupedMergeFlag() {
    this.groupedMergedFlags.value.clear();
    this.mergedFlags.value.forEach(flag => {
      const startDate = floorDay(flag.startAt);
      const endDate = ceilDay(flag.endAt);

      for (let i = startDate.unix(); i < endDate.unix(); i += 86400) {
        const current = dayjs.unix(i);

        this.groupedMergedFlags.value.set(current.format('YYYY-MM-DD'), {
          mergedFlags: flag,
          isStart: startDate.isSame(current),
          isEnd: endDate.isSame(current.add(1, 'd')),
        });
      }
    });

    this.emitEvent('groupedMergedFlags');
  }

  public getFlagIndexInWeekdays(flag: HCalendarPinFlag, weekStart: Dayjs) {
    const flagsArr = this.flagsInWeekdays.value.get(weekStart.unix());

    if (!flagsArr?.length) {
      return 0;
    }

    return flagsArr.findIndex(arr => arr.some(curr => curr === flag));
  }

  public getFlagsInWeek(weekStart: Dayjs, currentMonth?: Dayjs) {
    const res: HCalendarPinFlag[] = [];

    this.flagsInWeekdays.value.get(weekStart.day(0).unix())?.forEach(row => {
      row.forEach(item => {
        if (currentMonth) {
          const startDate = dayjs(currentMonth.format('YYYY-MM-01'));
          const endDate = dayjs(
            currentMonth.format(`YYYY-MM-${currentMonth.daysInMonth()} 23:59:59`),
          );

          if (startDate.isBefore(item._endAt) && endDate.isAfter(item._startAt)) {
            res.push(item);
          }
        } else {
          res.push(item);
        }
      });
    });

    return res;
  }

  public getFlagsInDay(dayStart: Dayjs) {
    const res: HCalendarPinFlag[] = [];

    this.flagsInDays.value.get(dayStart.unix())?.forEach(row => res.push(...row));

    return res;
  }

  public getFlagIndexInDay(flag: HCalendarPinFlag, day: Dayjs) {
    const flagsArr = this.flagsInDays.value.get(day.unix());

    if (!flagsArr?.length) {
      return 0;
    }

    return flagsArr.findIndex(arr => arr.some(curr => curr === flag));
  }

  public isFlagBorderingOnInDay(flag: HCalendarPinFlag, day: Dayjs, check: 'start' | 'end') {
    const flags =
      this.flagsInDays.value
        .get(day.unix())
        ?.flat()
        .filter(curr => curr !== flag) || [];

    return flags.some(curr => {
      if (check === 'start') {
        return curr._endAt?.isSame(flag._startAt) ?? false;
      } else {
        return curr._startAt?.isSame(flag._endAt) ?? false;
      }
    });
  }

  public getFlagsAmountInDay(startAt: Dayjs) {
    const flagsArr = this.flagsInWeekdays.value.get(startAt.day(0).unix()) || [];
    const endAt = startAt.add(86399, 's');

    for (let i = flagsArr.length - 1; i >= 0; i--) {
      const row = flagsArr[i];

      if (row.some(curr => startAt.isBefore(curr._endAt) && endAt.isAfter(curr._startAt))) {
        return i + 1;
      }
    }

    return 0;
  }

  public getFlagsAmountInHour(startAt: Dayjs, endAt: Dayjs, currentStart: Dayjs) {
    const flagsArr = this.flagsInDays.value.get(currentStart.unix()) || [];

    for (let i = flagsArr.length - 1; i >= 0; i--) {
      const row = flagsArr[i];

      if (
        row.some(curr => isDatesRangeAreOverlap([curr._startAt!, curr._endAt!], [startAt, endAt]))
      ) {
        return i + 1;
      }
    }

    return 0;
  }

  public addTempPinFlag(
    startAt: Dayjs,
    endAt: Dayjs,
    title?: string,
    type?: HCalendarPinFlag['type'],
  ) {
    const newPinFlag = {
      title: title ?? '',
      type: type ?? 'pill',
      _uuid: nanoid(),
      startAt,
      _startAt: startAt,
      endAt,
      _endAt: endAt,
      temp: true,
    };

    this._pinFlags.value.push(newPinFlag);
    this.calculateFlagsInWeekdays();
    this.calculateFlagsInDays();
    this.calculateMergedFlags();

    return newPinFlag;
  }

  public updateTempPinFlag(pinFlag: HCalendarPinFlag, removeTempTag = true, finished = false) {
    const index = this._pinFlags.value.findIndex(curr => curr._uuid === pinFlag._uuid);

    pinFlag.startAt = pinFlag._startAt!;
    pinFlag.endAt = pinFlag._endAt!;

    if (removeTempTag) {
      delete pinFlag['temp'];
    }

    this._pinFlags.value[index] = pinFlag;

    if (finished) {
      this.pinFlags.value = this._pinFlags.value;
      this.emitEvent('pinFlags');
    }

    this.calculateFlagsInWeekdays();
    this.calculateFlagsInDays();
    this.calculateMergedFlags();
  }

  public updateTempPinFlagDate(pinFlag: HCalendarPinFlag, finished = false) {
    const target = this._pinFlags.value.find(curr => curr._uuid === pinFlag._uuid);
    if (target) {
      let hasChanged = false;

      if (!pinFlag._startAt?.isSame(target._startAt)) {
        hasChanged = true;
        target.startAt = pinFlag._startAt!;
        target._startAt = pinFlag._startAt!;
      }

      if (!pinFlag._endAt?.isSame(target._endAt)) {
        hasChanged = true;
        target.endAt = pinFlag._endAt!;
        target._endAt = pinFlag._endAt!;
      }

      if (hasChanged) {
        if (finished) {
          this.pinFlags.value = this._pinFlags.value;
          this.emitEvent('pinFlags');
        }
        this.calculateFlagsInWeekdays();
        this.calculateFlagsInDays();
        this.calculateMergedFlags();
      }
    }
  }

  public removeTempPinFlag(pinFlag: HCalendarPinFlag) {
    const index = this._pinFlags.value.findIndex(item => item._uuid === pinFlag._uuid);
    this._pinFlags.value.splice(index, 1);

    this.pinFlags.value = this._pinFlags.value;
    this.emitEvent('pinFlags');
    this.calculateFlagsInWeekdays();
    this.calculateFlagsInDays();
    this.calculateMergedFlags();
  }
}
