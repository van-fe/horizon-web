import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import dayjs from '~/utils/useDayJs';
import type { Dayjs } from 'dayjs';
import CalendarHelper from '../src/utils/CalendarHelper';
import MonthDayHelper from '../src/utils/MonthDayHelper';
import PinFlagsHelper from '../src/utils/PinFlagsHelper';
import DragToCreateFlag from '../src/utils/DragToCreateFlag';
import { useCalendarEmits } from '../src/composables/useEmits';
import type { CalendarProps } from '../src/composables/useProps';
import type { HCalendarPinFlag } from '../src/utils/types';
import {
  calculateDisabledHours,
  ceilDay,
  floorDay,
  getDatesRangeCommonPart,
  getDatesRangeExcludeParts,
  getHeightCssRaw,
  getHourStartCssRaw,
  getHoursDiffCssRaw,
  getIntegratedDay,
  getMaxDate,
  getMinDate,
  getOneHourHeightCssRaw,
  getOneHourHeightPx,
  getOneSecondsHeightCssRaw,
  isDatesAreCrossDay,
  isDatesRangeAreOverlap,
  maxDayjs,
  minDayjs,
  onlyReserveToDay,
  sortDate,
  sortDateNeg,
  sortDatePos,
  sortDayRanges,
  sortDays,
} from '../src/utils/timeHelper';

describe('Calendar helpers', () => {
  const d = (value: string) => dayjs(value);

  test('sorts days/ranges in both directions and finds extrema', () => {
    const a = d('2026-01-01');
    const b = d('2026-01-02');
    const c = d('2026-01-03');
    expect(sortDays(c, a, b).map(value => value.date())).toEqual([1, 2, 3]);
    expect(sortDayRanges([c, c], [a, c], [a, b]).map(range => range[1].date())).toEqual([2, 3, 3]);
    expect(sortDayRanges([a, b], [a, c]).map(range => range[1].date())).toEqual([2, 3]);
    expect(sortDayRanges([a, b], [c, c]).map(range => range[0].date())).toEqual([1, 3]);
    expect(minDayjs(c, a, b).isSame(a)).toBe(true);
    expect(maxDayjs(a, c, b).isSame(c)).toBe(true);
    expect(getMinDate(c, a, b).isSame(a)).toBe(true);
    expect(getMaxDate(a, c, b).isSame(c)).toBe(true);
    expect(sortDate('pos', c, a, b)[0].isSame(a)).toBe(true);
    expect(sortDate('neg', a, c, b)[0].isSame(c)).toBe(true);
    expect(sortDatePos(c, a)[0].isSame(a)).toBe(true);
    expect(sortDateNeg(a, c)[0].isSame(c)).toBe(true);
  });

  test('floors/ceils integrated dates and builds CSS time geometry', () => {
    const noon = d('2026-01-01 12:30:15');
    expect(onlyReserveToDay(noon).format('HH:mm:ss')).toBe('00:00:00');
    expect(getIntegratedDay(noon).format('YYYY-MM-DD HH:mm:ss')).toBe('2026-01-01 00:00:00');
    expect(getIntegratedDay(noon, false).format('YYYY-MM-DD HH:mm:ss')).toBe('2026-01-02 00:00:00');
    expect(getIntegratedDay(d('2026-01-01')).format('YYYY-MM-DD')).toBe('2026-01-01');
    expect(floorDay(noon).hour()).toBe(0);
    expect(ceilDay(noon).date()).toBe(2);

    const hourRaw = getOneHourHeightCssRaw();
    expect(hourRaw).toContain('var(');
    expect(getOneSecondsHeightCssRaw()).toContain('/ 3600');
    expect(getHeightCssRaw(90)).toContain('* 90');
    expect(getHoursDiffCssRaw(d('2026-01-01 01:00'), d('2026-01-01 03:00'))).toContain('* 7200');
    expect(getHourStartCssRaw(d('2026-01-01 01:30'))).toContain('* 5400');
    expect(Number.isFinite(getOneHourHeightPx())).toBe(true);
  });

  test('computes overlap/common/excluded range contracts for every relative position', () => {
    const r = (start: string, end: string) => [d(start), d(end)] as [Dayjs, Dayjs];
    const current = r('2026-01-01', '2026-01-10');
    expect(isDatesRangeAreOverlap(current, r('2026-01-05', '2026-01-15'))).toBe(true);
    expect(isDatesRangeAreOverlap(current, r('2026-01-10', '2026-01-12'))).toBe(false);
    expect(getDatesRangeCommonPart(current, r('2026-01-05', '2026-01-15'))?.[0].date()).toBe(5);
    expect(getDatesRangeCommonPart(current, r('2026-02-01', '2026-02-02'))).toBeUndefined();
    expect(getDatesRangeExcludeParts(current, r('2026-02-01', '2026-02-02'))).toEqual([current]);
    expect(getDatesRangeExcludeParts(current, r('2025-12-01', '2026-02-01'))).toBeUndefined();
    expect(getDatesRangeExcludeParts(current, r('2026-01-03', '2026-01-08'))).toHaveLength(2);
    expect(getDatesRangeExcludeParts(current, r('2026-01-05', '2026-02-01'))).toHaveLength(1);
    expect(getDatesRangeExcludeParts(current, r('2025-12-01', '2026-01-05'))).toHaveLength(1);
    expect(isDatesAreCrossDay(d('2026-01-01 23:00'), d('2026-01-02 01:00'))).toBe(true);
    expect(isDatesAreCrossDay(d('2026-01-01 01:00'), d('2026-01-01 23:00'))).toBe(false);
  });

  test('merges overlapping disabled-hour ranges and preserves disjoint ranges', () => {
    const ranges: [Dayjs, Dayjs][] = [
      [d('2026-01-01 01:00'), d('2026-01-01 03:00')],
      [d('2026-01-01 02:00'), d('2026-01-01 05:00')],
      [d('2026-01-01 08:00'), d('2026-01-01 09:00')],
      [d('2026-01-01 04:00'), d('2026-01-01 08:30')],
    ];
    const result = calculateDisabledHours(d('2026-01-01'), ranges);
    expect(result).toHaveLength(1);
    expect(result[0][0].hour()).toBe(1);
    expect(result[0][1].hour()).toBe(9);
    expect(calculateDisabledHours(d('2026-01-01'), [])).toEqual([]);
  });

  test('CalendarHelper fills and reacts across month/year/week/day modes', async () => {
    const dateType = ref<'full' | 'only-current'>('full');
    const mode = ref<'month' | 'year' | 'week' | 'day'>('month');
    const disableDate = vi.fn((date: Dayjs) => [0, 6].includes(date.day()));
    const helper = new CalendarHelper(d('2026-02-15'), dateType, mode, ref(disableDate));
    expect(helper.monthDays.value).toHaveLength(42);
    expect(helper.disabledMonthDays.value.size).toBeGreaterThan(0);
    expect(helper.isDisabledDay(d('2026-02-01'))).toBe(true);

    dateType.value = 'only-current';
    await nextTick();
    expect(helper.monthDays.value.length).toBeLessThanOrEqual(35);
    mode.value = 'year';
    await nextTick();
    expect(helper.yearMonths.value).toHaveLength(12);
    expect(helper.disabledYearDays.value.size).toBeGreaterThan(0);
    expect(helper.isDisabledDay(d('2026-02-01'))).toBe(true);
    mode.value = 'week';
    await nextTick();
    expect(helper.weekDays.value).toHaveLength(7);
    expect(helper.getFirstDayOfWeekBetweenTodayDiff()).toBeGreaterThanOrEqual(0);
    expect(helper.getFirstDayOfWeekBetweenTodayDiff('hour')).toBeGreaterThanOrEqual(0);
    mode.value = 'day';
    await nextTick();
    expect(helper.isDisabledDay(d('2026-02-01'))).toBeUndefined();

    mode.value = 'week';
    await nextTick();
    helper.updateCurrentDate('2027-03-04');
    expect(helper.weekDays.value[0].year()).toBe(2027);
    const noDisabled = new CalendarHelper(d('2026-01-01'), dateType, ref('month'), ref());
    expect(noDisabled.disabledMonthDays.value.size).toBe(0);
  });

  test('MonthDayHelper reacts to full/current modes and month updates', async () => {
    const dateType = ref<'full' | 'only-current'>('full');
    const helper = new MonthDayHelper('2026-02-15', dateType);
    expect(helper.days.value).toHaveLength(42);
    expect(helper.days.value[0].format('YYYY-MM')).toBe('2026-02');
    dateType.value = 'only-current';
    await nextTick();
    expect(helper.days.value.length).toBeLessThanOrEqual(35);
    helper.updateCurrentMonth(d('2026-08-20'));
    expect(helper.current.value.format('YYYY-MM')).toBe('2026-08');
    expect(helper.days.value.some(date => date.month() === 6)).toBe(true);
    expect(helper.days.value.some(date => date.month() === 8)).toBe(true);
  });

  test('validates every public Calendar emit payload and rejection branch', () => {
    const date = d('2026-08-10');
    expect(useCalendarEmits['update:modelValue']('2026-08-10')).toBe(true);
    expect(useCalendarEmits['update:modelValue'](1 as never)).toBe(false);
    expect(useCalendarEmits['update:pinFlags']([])).toBe(true);
    expect(useCalendarEmits['update:pinFlags']({} as never)).toBe(false);
    expect(useCalendarEmits['update:mode']('week')).toBe(true);
    expect(useCalendarEmits['update:mode'](1 as never)).toBe(false);
    for (const name of ['change', 'dateClick', 'typeChange', 'prevClick', 'nextClick'] as const) {
      expect(useCalendarEmits[name]('2026-08-10', 'day', date)).toBe(true);
      expect(useCalendarEmits[name](1 as never, 'day', date)).toBe(false);
      expect(useCalendarEmits[name]('2026-08-10', 1 as never, date)).toBe(false);
      expect(useCalendarEmits[name]('2026-08-10', 'day', {} as never)).toBe(false);
    }
    expect(useCalendarEmits.pinFlagClick({ title: 'Flag', startAt: date })).toBe(true);
    expect(useCalendarEmits.pinFlagClick(null as never)).toBe(false);
  });

  test('PinFlagsHelper groups overlaps by week/day and exposes query contracts', () => {
    const flags: HCalendarPinFlag[] = [
      { title: 'A', startAt: '2026-01-01 01:00', endAt: '2026-01-03 03:00' },
      { title: 'B', startAt: '2026-01-01 02:00', endAt: '2026-01-01 04:00' },
      { title: 'C', startAt: '2026-01-05 01:00', endAt: '2026-01-05 02:00' },
      { title: 'Default end', startAt: '2026-01-06' },
      { title: 'Same start longer', startAt: '2026-01-01 01:00', endAt: '2026-01-04' },
    ];
    const helper = new PinFlagsHelper(flags, {} as CalendarProps);
    expect(helper.pinFlags.value).toEqual(flags);
    expect(helper.flagsInWeekdays.value.size).toBeGreaterThan(0);
    expect(helper.flagsInDays.value.size).toBeGreaterThan(0);
    expect(helper.mergedFlags.value).toHaveLength(3);
    expect(helper.groupedMergedFlags.value.size).toBeGreaterThan(0);

    const weekStart = d('2025-12-28');
    const inWeek = helper.getFlagsInWeek(weekStart);
    expect(inWeek.length).toBeGreaterThan(0);
    expect(helper.getFlagsInWeek(weekStart, d('2026-01-01')).length).toBeGreaterThan(0);
    expect(helper.getFlagsInWeek(weekStart, d('2028-01-01'))).toEqual([]);
    const first = inWeek[0];
    expect(helper.getFlagIndexInWeekdays(first, weekStart)).toBeGreaterThanOrEqual(0);
    expect(helper.getFlagIndexInWeekdays(first, d('2030-01-01'))).toBe(0);

    const dayStart = d('2026-01-01').startOf('day');
    const inDay = helper.getFlagsInDay(dayStart);
    expect(inDay.length).toBeGreaterThan(0);
    expect(helper.getFlagIndexInDay(inDay[0], dayStart)).toBeGreaterThanOrEqual(0);
    expect(helper.getFlagIndexInDay(inDay[0], d('2030-01-01'))).toBe(0);
    expect(helper.getFlagsAmountInDay(dayStart)).toBeGreaterThan(0);
    expect(helper.getFlagsAmountInDay(d('2030-01-01'))).toBe(0);
    expect(
      helper.getFlagsAmountInHour(d('2026-01-01 01:30'), d('2026-01-01 03:30'), dayStart),
    ).toBeGreaterThan(0);
    expect(
      helper.getFlagsAmountInHour(
        d('2026-01-05 12:00'),
        d('2026-01-05 13:00'),
        d('2026-01-05').startOf('day'),
      ),
    ).toBe(0);
    expect(helper.getFlagsAmountInHour(d('2030-01-01'), d('2030-01-02'), d('2030-01-01'))).toBe(0);
  });

  test('PinFlagsHelper temp lifecycle emits, updates borders and removes listeners', () => {
    const helper = new PinFlagsHelper([], {} as CalendarProps);
    const listener = vi.fn();
    helper.addEventListener('pinFlags', listener);
    const temp = helper.addTempPinFlag(
      d('2026-02-01 01:00'),
      d('2026-02-01 02:00'),
      'Temp',
      'warning',
    );
    expect(temp).toMatchObject({ title: 'Temp', type: 'warning', temp: true });
    helper.updateTempPinFlag(temp, false, false);
    expect(temp.temp).toBe(true);
    helper.updateTempPinFlag(temp, true, true);
    expect(temp.temp).toBeUndefined();
    expect(listener).toHaveBeenCalled();

    const changed = {
      ...temp,
      _startAt: d('2026-02-01 00:30'),
      _endAt: d('2026-02-01 03:00'),
    };
    helper.updateTempPinFlagDate(changed, true);
    helper.updateTempPinFlagDate(changed, true);
    helper.updateTempPinFlagDate({ ...changed, _uuid: 'missing' }, true);
    expect(helper.getFlagsInDay(d('2026-02-01')).length).toBeGreaterThan(0);

    const neighboring = helper.addTempPinFlag(d('2026-02-01 03:00'), d('2026-02-01 04:00'));
    expect(helper.isFlagBorderingOnInDay(neighboring, d('2026-02-01'), 'start')).toBe(true);
    expect(helper.isFlagBorderingOnInDay(changed, d('2026-02-01'), 'end')).toBe(true);
    expect(helper.isFlagBorderingOnInDay(changed, d('2030-01-01'), 'start')).toBe(false);
    helper.removeTempPinFlag(neighboring);
    helper.removeEventListener('pinFlags', listener);
    helper.updateData([]);
    expect(helper.pinFlags.value).toEqual([]);
  });

  test('DragToCreateFlag guards disabled state and reserves true/object/false results', async () => {
    vi.spyOn(DragToCreateFlag, 'getOneSecondsHeightPx').mockReturnValue(1);
    const body = document.createElement('div');
    body.getBoundingClientRect = () =>
      ({ top: 0, left: 0, right: 100, bottom: 100, width: 100, height: 100 }) as DOMRect;
    const dayStart = d('2026-03-01').startOf('day');
    const mouse = (offsetY: number) =>
      ({ target: body, offsetY, stopPropagation: vi.fn() }) as unknown as MouseEvent;

    const blockedFlags = new PinFlagsHelper([], {} as CalendarProps);
    new DragToCreateFlag(ref(body), blockedFlags, {
      enableCreatePinFlags: false,
    } as CalendarProps).onMousedown(mouse(3600), dayStart);
    new DragToCreateFlag(ref(null), blockedFlags, {
      enableCreatePinFlags: true,
    } as CalendarProps).onMousedown(mouse(3600), dayStart);
    expect(blockedFlags.pinFlags.value).toEqual([]);

    for (const reserve of [true, false, { title: 'Modified', type: 'success' as const }]) {
      const flags = new PinFlagsHelper([], {} as CalendarProps);
      const props = {
        enableCreatePinFlags: true,
        creatingPinFlagCallback: () => ({ title: 'Creating', type: 'warning' as const }),
        creatFinishFlagCallback: vi.fn(async (flag: HCalendarPinFlag) =>
          typeof reserve === 'object' ? { ...flag, ...reserve } : reserve,
        ),
      } as unknown as CalendarProps;
      const drag = new DragToCreateFlag(ref(body), flags, props);
      drag.onMousedown(mouse(3600), dayStart);
      document.documentElement.dispatchEvent(new MouseEvent('mouseup'));
      await new Promise(resolve => setTimeout(resolve, 0));
      if (reserve === false) {
        expect(flags.pinFlags.value).toHaveLength(0);
      } else {
        expect(flags.pinFlags.value).toHaveLength(1);
        expect(flags.pinFlags.value[0].title).toBe(reserve === true ? 'Creating' : 'Modified');
      }
    }
  });

  test('DragToCreateFlag follows pointer geometry, cross-day and disabled-hour policies', async () => {
    vi.spyOn(DragToCreateFlag, 'getOneSecondsHeightPx').mockReturnValue(1);
    const body = document.createElement('div');
    body.getBoundingClientRect = () =>
      ({ top: 0, left: 0, right: 100, bottom: 100, width: 100, height: 100 }) as DOMRect;
    const dayStart = d('2026-03-02').startOf('day');

    for (const [through, clientY] of [
      [false, 18_000],
      [true, 18_000],
      [false, 900],
    ] as const) {
      const flags = new PinFlagsHelper([], {} as CalendarProps);
      const props = {
        enableCreatePinFlags: true,
        createFlagCanThoughDisableDateOrHour: through,
        disableHours: () => [[dayStart.add(2, 'hour'), dayStart.add(4, 'hour')]],
        creatFinishFlagCallback: async () => true,
      } as unknown as CalendarProps;
      const drag = new DragToCreateFlag(ref(body), flags, props);
      drag.setCanCrossDay(through);
      drag.onMousedown({ target: body, offsetY: 3600 } as unknown as MouseEvent, dayStart);
      document.documentElement.dispatchEvent(new MouseEvent('mousemove', { clientY }));
      document.documentElement.dispatchEvent(new MouseEvent('mouseleave'));
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(flags.pinFlags.value).toHaveLength(1);
      expect(flags.pinFlags.value[0]._endAt?.isAfter(flags.pinFlags.value[0]._startAt!)).toBe(true);
    }

    const swallowed = new PinFlagsHelper([], {} as CalendarProps);
    const drag = new DragToCreateFlag(ref(body), swallowed, {
      enableCreatePinFlags: true,
      disableHours: () => [[dayStart, dayStart.endOf('day')]],
      creatFinishFlagCallback: async () => false,
    } as unknown as CalendarProps);
    drag.onMousedown({ target: body, offsetY: 3600 } as unknown as MouseEvent, dayStart);
    document.documentElement.dispatchEvent(new MouseEvent('mousemove', { clientY: 7200 }));
    document.documentElement.dispatchEvent(new MouseEvent('mouseup'));
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(swallowed.pinFlags.value).toHaveLength(0);

    const equalityFlags = new PinFlagsHelper([], {} as CalendarProps);
    const scrollRef = ref<HTMLElement | null>(body);
    const equalityDrag = new DragToCreateFlag(scrollRef, equalityFlags, {
      enableCreatePinFlags: true,
      creatFinishFlagCallback: async () => true,
    } as unknown as CalendarProps);
    equalityDrag.onMousedown({ target: body, offsetY: 3600 } as unknown as MouseEvent, dayStart);
    document.documentElement.dispatchEvent(new MouseEvent('mousemove', { clientY: 3600 }));
    scrollRef.value = null;
    document.documentElement.dispatchEvent(new MouseEvent('mousemove', { clientY: 7200 }));
    scrollRef.value = body;
    document.documentElement.dispatchEvent(new MouseEvent('mousemove', { clientY: 7200 }));
    document.documentElement.dispatchEvent(new MouseEvent('mouseup'));
    await new Promise(resolve => setTimeout(resolve, 0));

    const reverseFlags = new PinFlagsHelper([], {} as CalendarProps);
    const reverseDrag = new DragToCreateFlag(ref(body), reverseFlags, {
      enableCreatePinFlags: true,
      createFlagCanThoughDisableDateOrHour: false,
      disableHours: () => [[dayStart.add(2, 'hour'), dayStart.add(4, 'hour')]],
      creatFinishFlagCallback: async () => true,
    } as unknown as CalendarProps);
    reverseDrag.onMousedown({ target: body, offsetY: 18_000 } as unknown as MouseEvent, dayStart);
    document.documentElement.dispatchEvent(new MouseEvent('mousemove', { clientY: 3600 }));
    document.documentElement.dispatchEvent(new MouseEvent('mouseup'));
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(reverseFlags.pinFlags.value).toHaveLength(1);
  });
});
