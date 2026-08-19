import { describe, expect, it } from 'vitest';
import {
  calendarRangesOverlap,
  createCalendarModel,
  createCalendarMonthGrid,
  createCalendarSchedule,
  createCalendarWeek,
  createCalendarYearGrid,
  groupCalendarRangesByLane,
  groupOverlappingCalendarRanges,
  intersectCalendarRanges,
  isCalendarMode,
  isCalendarModeList,
  isCalendarStartHour,
  isCalendarValue,
  layoutCalendarRanges,
  mergeCalendarRanges,
  normalizeCalendarRange,
  resolveCalendarInitialMode,
  resolveCalendarModeStep,
  resolveCalendarSelectionRange,
  subtractCalendarRange,
} from '..';

describe('Calendar framework-free capabilities', () => {
  it('validates public values and modes', () => {
    expect(isCalendarMode('month')).toBe(true);
    expect(isCalendarMode('agenda')).toBe(false);
    expect(isCalendarModeList(['year', 'day'])).toBe(true);
    expect(isCalendarModeList(['month', 'agenda'])).toBe(false);
    expect(isCalendarStartHour(0)).toBe(true);
    expect(isCalendarStartHour(23)).toBe(true);
    expect(isCalendarStartHour(24)).toBe(false);
    expect(isCalendarValue(new Date('2026-08-13'))).toBe(true);
    expect(isCalendarValue('2026-08-13')).toBe(true);
    expect(isCalendarValue(Number.NaN)).toBe(false);
    expect(isCalendarValue('')).toBe(false);
  });

  it('normalizes, intersects and subtracts timestamp ranges', () => {
    expect(normalizeCalendarRange({ start: 5, end: 1 })).toEqual({ start: 1, end: 5 });
    expect(calendarRangesOverlap({ start: 0, end: 10 }, { start: 10, end: 20 })).toBe(false);
    expect(calendarRangesOverlap({ start: 0, end: 10 }, { start: 9, end: 20 })).toBe(true);
    expect(intersectCalendarRanges({ start: 0, end: 10 }, { start: 4, end: 6 })).toEqual({
      start: 4,
      end: 6,
    });
    expect(subtractCalendarRange({ start: 0, end: 10 }, { start: 4, end: 6 })).toEqual([
      { start: 0, end: 4 },
      { start: 6, end: 10 },
    ]);
    expect(subtractCalendarRange({ start: 0, end: 10 }, { start: 20, end: 30 })).toEqual([
      { start: 0, end: 10 },
    ]);
  });

  it('merges and assigns overlapping ranges to stable lanes', () => {
    expect(
      mergeCalendarRanges([
        { start: 8, end: 12 },
        { start: 0, end: 5 },
        { start: 4, end: 10 },
      ]),
    ).toEqual([{ start: 0, end: 12 }]);
    const positioned = layoutCalendarRanges([
      { id: 'a', start: 0, end: 10 },
      { id: 'b', start: 2, end: 4 },
      { id: 'c', start: 10, end: 12 },
    ]);
    expect(positioned.map(item => [item.range.id, item.lane])).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 0],
    ]);
    expect(
      groupOverlappingCalendarRanges([
        { id: 'a', start: 0, end: 4 },
        { id: 'b', start: 3, end: 8 },
        { id: 'c', start: 7, end: 10 },
        { id: 'd', start: 20, end: 30 },
      ]).map(group => group.map(item => item.id)),
    ).toEqual([['a', 'b', 'c'], ['d']]);
  });

  it('resolves drag selection around disabled ranges in either direction', () => {
    expect(
      resolveCalendarSelectionRange({
        anchor: 60,
        current: 240,
        minimumDuration: 30,
        disabledRanges: [{ start: 120, end: 180 }],
      }),
    ).toEqual({ start: 60, end: 120 });
    expect(
      resolveCalendarSelectionRange({
        anchor: 240,
        current: 60,
        minimumDuration: 30,
        disabledRanges: [{ start: 120, end: 180 }],
      }),
    ).toEqual({ start: 180, end: 240 });
    expect(
      resolveCalendarSelectionRange({
        anchor: 60,
        current: 240,
        disabledRanges: [{ start: 120, end: 180 }],
        canCrossDisabledRange: true,
      }),
    ).toEqual({ start: 60, end: 240 });
    expect(
      resolveCalendarSelectionRange({
        anchor: 130,
        current: 150,
        minimumDuration: 30,
        disabledRanges: [{ start: 120, end: 180 }],
      }),
    ).toBeUndefined();
  });

  it('resolves initial modes and navigation units', () => {
    expect(resolveCalendarInitialMode('day', ['month', 'day'])).toBe('day');
    expect(resolveCalendarInitialMode('week', ['year', 'month'])).toBe('year');
    expect(resolveCalendarInitialMode(undefined, [])).toBe('month');
    expect(resolveCalendarModeStep('year')).toEqual({ amount: 1, unit: 'year' });
    expect(resolveCalendarModeStep('week')).toEqual({ amount: 1, unit: 'week' });
    expect(resolveCalendarModeStep('day')).toEqual({ amount: 1, unit: 'day' });
    expect(resolveCalendarModeStep('month')).toEqual({ amount: 1, unit: 'month' });
  });

  it('creates stable month, week and year grids', () => {
    const august = createCalendarMonthGrid(2026, 7);
    expect(august).toHaveLength(42);
    expect(new Date(august[0]).getDay()).toBe(0);
    expect(new Date(august.at(-1)!).getDay()).toBe(6);
    expect(createCalendarMonthGrid(2026, 1, 'only-current')).toHaveLength(28);
    expect(createCalendarWeek(new Date(2026, 7, 13))).toHaveLength(7);
    expect(createCalendarYearGrid(2026)).toHaveLength(12);
    expect(
      groupCalendarRangesByLane([
        { id: 'a', start: 0, end: 10 },
        { id: 'b', start: 2, end: 4 },
        { id: 'c', start: 10, end: 12 },
      ]).map(lane => lane.map(item => item.id)),
    ).toEqual([['a', 'c'], ['b']]);
  });

  it('owns uncontrolled date and mode navigation without a renderer', () => {
    const changes: Array<[string, number | string]> = [];
    const model = createCalendarModel({
      defaultValue: new Date(2024, 0, 31, 10),
      defaultMode: 'month',
      now: () => new Date(2026, 7, 19, 9),
      onValueChange: (value, details) => changes.push([details.reason, value]),
      onModeChange: (mode, details) => changes.push([details.reason, mode]),
    });
    const snapshots: number[] = [];
    model.subscribe(state => snapshots.push(state.value));

    expect(model.next()).toBe(true);
    expect(new Date(model.getState().value).getDate()).toBe(29);
    expect(model.setMode('week')).toBe(true);
    expect(model.previous()).toBe(true);
    expect(model.today()).toBe(true);
    expect(model.getState().mode).toBe('week');
    expect(new Date(model.getState().value).getFullYear()).toBe(2026);
    expect(changes.map(([reason]) => reason)).toEqual(['next', 'set-mode', 'previous', 'today']);
    expect(snapshots).toHaveLength(4);
    model.destroy();
    expect(model.next()).toBe(false);
  });

  it('proposes controlled changes and waits for renderer synchronization', () => {
    const proposed: number[] = [];
    const initial = new Date(2026, 7, 19).getTime();
    const model = createCalendarModel({
      value: initial,
      mode: 'day',
      modes: ['day', 'week'],
      controlledValue: true,
      controlledMode: true,
      onValueChange: value => proposed.push(value),
    });
    expect(model.next()).toBe(true);
    expect(model.getState().value).toBe(initial);
    expect(proposed).toHaveLength(1);
    model.update({ value: proposed[0] });
    expect(model.getState().value).toBe(proposed[0]);
    expect(model.setMode('week')).toBe(true);
    expect(model.getState().mode).toBe('day');
    model.update({ mode: 'week' });
    expect(model.getState().mode).toBe('week');
  });

  it('keeps local calendar grids consecutive across offset changes', () => {
    const days = createCalendarMonthGrid(2026, 2);
    for (let index = 1; index < days.length; index += 1) {
      const previous = new Date(days[index - 1]);
      const current = new Date(days[index]);
      const expected = new Date(previous);
      expected.setDate(expected.getDate() + 1);
      expect(current.getFullYear()).toBe(expected.getFullYear());
      expect(current.getMonth()).toBe(expected.getMonth());
      expect(current.getDate()).toBe(expected.getDate());
    }
  });

  it('owns schedule mutation and lane projection without a renderer', () => {
    type Item = { id: string; start: number; end: number; title: string };
    const changes: string[] = [];
    const schedule = createCalendarSchedule<Item>({
      defaultItems: [{ id: 'a', start: 0, end: 10, title: 'A' }],
      getId: item => item.id,
      getStart: item => item.start,
      getEnd: item => item.end,
      onItemsChange: (_items, reason) => changes.push(reason),
    });
    expect(schedule.add({ id: 'b', start: 2, end: 4, title: 'B' })).toBe(true);
    expect(schedule.getLanes().map(lane => lane.map(entry => entry.id))).toEqual([['a'], ['b']]);
    expect(schedule.getInRange({ start: 3, end: 5 }).map(entry => entry.id)).toEqual(['a', 'b']);
    expect(schedule.replace('b', { id: 'b', start: 10, end: 12, title: 'B2' })).toBe(true);
    expect(schedule.getLanes().map(lane => lane.map(entry => entry.id))).toEqual([['a', 'b']]);
    expect(schedule.remove('a')).toBe(true);
    expect(changes).toEqual(['add', 'update', 'remove']);
    schedule.destroy();
    expect(schedule.add({ id: 'c', start: 0, end: 1, title: 'C' })).toBe(false);
  });

  it('does not mutate controlled schedules before external acceptance', () => {
    const proposals: ReadonlyArray<{ id: string; start: number; end: number }>[] = [];
    const schedule = createCalendarSchedule({
      items: [{ id: 'a', start: 0, end: 1 }],
      controlled: true,
      getId: item => item.id,
      getStart: item => item.start,
      getEnd: item => item.end,
      onItemsChange: items => proposals.push(items),
    });
    expect(schedule.add({ id: 'b', start: 2, end: 3 })).toBe(true);
    expect(schedule.getItems().map(item => item.id)).toEqual(['a']);
    schedule.update({ items: proposals[0] });
    expect(schedule.getItems().map(item => item.id)).toEqual(['a', 'b']);
  });
});
