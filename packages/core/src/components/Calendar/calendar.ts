import type { CalendarDateType, CalendarMode, CalendarValue } from './types';
import { CALENDAR_DEFAULTS, isCalendarMode } from './types';

export type CalendarModelChangeReason = 'set-date' | 'previous' | 'next' | 'today' | 'set-mode';

export interface CalendarModelState {
  value: number;
  mode: CalendarMode;
}

export interface CalendarModelChangeDetails {
  reason: CalendarModelChangeReason;
  previous: Readonly<CalendarModelState>;
}

export interface CalendarModelOptions {
  value?: CalendarValue;
  defaultValue?: CalendarValue;
  mode?: CalendarMode;
  defaultMode?: CalendarMode;
  modes?: readonly CalendarMode[];
  /** Explicit because `undefined` alone cannot distinguish an omitted renderer prop. */
  controlledValue?: boolean;
  controlledMode?: boolean;
  now?: () => CalendarValue;
  onValueChange?: (value: number, details: CalendarModelChangeDetails) => void;
  onModeChange?: (mode: CalendarMode, details: CalendarModelChangeDetails) => void;
}

export interface CalendarModel {
  getState(): Readonly<CalendarModelState>;
  subscribe(listener: (state: Readonly<CalendarModelState>) => void): () => void;
  update(options: Partial<CalendarModelOptions>): void;
  setDate(value: CalendarValue): boolean;
  setMode(mode: CalendarMode): boolean;
  previous(): boolean;
  next(): boolean;
  today(): boolean;
  destroy(): void;
}

function toTimestamp(value: CalendarValue | undefined, fallback: CalendarValue): number {
  const timestamp = value instanceof Date ? value.getTime() : new Date(value ?? fallback).getTime();
  return Number.isFinite(timestamp) ? timestamp : new Date(fallback).getTime();
}

export function resolveCalendarInitialMode(
  mode: CalendarMode | undefined,
  modes: readonly CalendarMode[],
): CalendarMode {
  return mode && modes.includes(mode) ? mode : (modes[0] ?? CALENDAR_DEFAULTS.mode);
}

export function resolveCalendarModeStep(mode: CalendarMode): {
  amount: number;
  unit: 'day' | 'week' | 'month' | 'year';
} {
  return mode === 'year'
    ? { amount: 1, unit: 'year' }
    : mode === 'week'
      ? { amount: 1, unit: 'week' }
      : mode === 'day'
        ? { amount: 1, unit: 'day' }
        : { amount: 1, unit: 'month' };
}

/** Returns a local start-of-day timestamp without depending on a date library. */
export function startOfCalendarDay(value: Date | number): number {
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function addCalendarMonths(value: number, amount: number): number {
  const source = new Date(value);
  const target = new Date(value);
  const sourceDate = source.getDate();
  target.setDate(1);
  target.setMonth(target.getMonth() + amount);
  const lastDate = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(sourceDate, lastDate));
  return target.getTime();
}

export function addCalendarPeriod(value: number, mode: CalendarMode, amount: number): number {
  if (mode === 'month') return addCalendarMonths(value, amount);
  if (mode === 'year') return addCalendarMonths(value, amount * 12);
  const date = new Date(value);
  date.setDate(date.getDate() + amount * (mode === 'week' ? 7 : 1));
  return date.getTime();
}

function enumerateLocalDays(start: Date, count: number): number[] {
  return Array.from({ length: count }, (_, index) =>
    new Date(start.getFullYear(), start.getMonth(), start.getDate() + index).getTime(),
  );
}

function countLocalDays(start: Date, end: Date): number {
  let count = 0;
  const cursor = new Date(start);
  while (cursor <= end) {
    count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

export function createCalendarMonthGrid(
  year: number,
  month: number,
  dateType: CalendarDateType = 'full',
): number[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const start = new Date(year, month, 1 - first.getDay());
  const end = new Date(year, month, last.getDate() + (6 - last.getDay()));
  const naturalLength = countLocalDays(start, end);
  const count = dateType === 'full' ? Math.max(42, naturalLength) : naturalLength;
  return enumerateLocalDays(start, count);
}

export function createCalendarWeek(value: Date | number): number[] {
  const date = new Date(value);
  return enumerateLocalDays(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()),
    7,
  );
}

export function createCalendarYearGrid(
  year: number,
  dateType: CalendarDateType = 'full',
): number[][] {
  return Array.from({ length: 12 }, (_, month) => createCalendarMonthGrid(year, month, dateType));
}

export function createCalendarModel(initial: CalendarModelOptions = {}): CalendarModel {
  let options = { ...initial };
  const now = () => options.now?.() ?? new Date();
  let state: CalendarModelState = {
    value: toTimestamp(options.value ?? options.defaultValue, now()),
    mode: resolveCalendarInitialMode(
      options.mode ?? options.defaultMode ?? CALENDAR_DEFAULTS.mode,
      options.modes ?? CALENDAR_DEFAULTS.modeSwitchableList,
    ),
  };
  let destroyed = false;
  const listeners = new Set<(state: Readonly<CalendarModelState>) => void>();

  const notify = () => {
    for (const listener of listeners) listener({ ...state });
  };
  const commitValue = (value: number, reason: CalendarModelChangeReason): boolean => {
    if (destroyed || value === state.value) return false;
    const previous = { ...state };
    options.onValueChange?.(value, { reason, previous });
    if (!options.controlledValue) {
      state = { ...state, value };
      notify();
    }
    return true;
  };

  return {
    getState: () => ({ ...state }),
    subscribe(listener) {
      if (destroyed) return () => {};
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update(next) {
      if (destroyed) return;
      options = { ...options, ...next };
      let changed = false;
      if (Object.hasOwn(next, 'value') && next.value !== undefined) {
        const value = toTimestamp(next.value, state.value);
        changed ||= value !== state.value;
        state = { ...state, value };
      }
      if (Object.hasOwn(next, 'mode') && next.mode && isCalendarMode(next.mode)) {
        changed ||= next.mode !== state.mode;
        state = { ...state, mode: next.mode };
      }
      if (changed) notify();
    },
    setDate(value) {
      return commitValue(toTimestamp(value, state.value), 'set-date');
    },
    setMode(mode) {
      if (destroyed || !isCalendarMode(mode) || mode === state.mode) return false;
      const previous = { ...state };
      options.onModeChange?.(mode, { reason: 'set-mode', previous });
      if (!options.controlledMode) {
        state = { ...state, mode };
        notify();
      }
      return true;
    },
    previous() {
      return commitValue(addCalendarPeriod(state.value, state.mode, -1), 'previous');
    },
    next() {
      return commitValue(addCalendarPeriod(state.value, state.mode, 1), 'next');
    },
    today() {
      return commitValue(toTimestamp(now(), state.value), 'today');
    },
    destroy() {
      destroyed = true;
      listeners.clear();
    },
  };
}
