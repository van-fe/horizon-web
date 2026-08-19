import type { CSSProperties, HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  CalendarDateType,
  CalendarHourFormat,
  CalendarMode,
  CalendarModel,
  CalendarModelChangeDetails,
  CalendarPinFlag,
  CalendarValue,
} from '@aurora/core';
import {
  CALENDAR_DEFAULTS,
  createCalendarModel,
  createCalendarMonthGrid,
  createCalendarSchedule,
  createCalendarWeek,
  intersectCalendarRanges,
  layoutCalendarRanges,
  resolveCalendarSelectionRange,
} from '@aurora/core';
import type {
  CalendarPointerSelectionController,
  CalendarTimelineScroller,
} from '@aurora/horizon-core';
import {
  createCalendarPointerSelection,
  createCalendarTimelineScroller,
} from '@aurora/horizon-core';
import { useHorizonWebConfig } from '../../provider';

export type {
  CalendarDateType,
  CalendarHourFormat,
  CalendarMode,
  CalendarPinFlag,
  CalendarPinFlagType,
  CalendarValue,
} from '@aurora/core';

export interface CalendarChangeDetails {
  mode: CalendarMode;
  reason: CalendarModelChangeDetails['reason'];
}

export interface CalendarCellContext {
  date: Date;
  value: string;
  mode: CalendarMode;
  current: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
}

export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Selected calendar date. */
  value?: CalendarValue;
  /** Initial selected date for an uncontrolled Calendar. */
  defaultValue?: CalendarValue;
  /** Called when Calendar proposes another date. */
  onValueChange?: (value: Date, details: CalendarChangeDetails) => void;
  /** Active view. */
  mode?: CalendarMode;
  /** Initial view for an uncontrolled Calendar. */
  defaultMode?: CalendarMode;
  /** Called when Calendar proposes another view. */
  onModeChange?: (mode: CalendarMode) => void;
  /** Whether the native view selector is shown. */
  modeSwitchable?: boolean;
  /** Views available to navigation and the native selector. */
  modeSwitchableList?: readonly CalendarMode[];
  /** Month grid coverage rule. */
  dateType?: CalendarDateType;
  /** Timeline hour label format. */
  hourFormat?: CalendarHourFormat;
  /** Hour scrolled into view when a day or week timeline opens. */
  defaultStartHour?: number;
  /** Allows date cells to propose a new value. */
  pickable?: boolean;
  /** Marks a calendar date as unavailable. */
  disabledDate?: (date: Date) => boolean;
  /** Returns unavailable timeline intervals for one day. */
  disabledHours?: (date: Date) => readonly (readonly [Date, Date])[];
  /** Controlled schedule entries. */
  pinFlags?: readonly CalendarPinFlag<ReactNode>[];
  /** Initial schedule entries for an uncontrolled Calendar. */
  defaultPinFlags?: readonly CalendarPinFlag<ReactNode>[];
  /** Called when the shared schedule proposes a new entry list. */
  onPinFlagsChange?: (flags: readonly CalendarPinFlag<ReactNode>[]) => void;
  /** Called after an interactive schedule entry is activated. */
  onPinFlagClick?: (flag: CalendarPinFlag<ReactNode>) => void;
  pinFlagsShowTime?: boolean;
  /** Enables pointer-based schedule creation in day and week views. */
  enableCreatePinFlags?: boolean;
  /** Allows a created range to span a disabled interval. */
  createFlagCanThroughDisabledRange?: boolean;
  onCreatePinFlag?: (
    flag: CalendarPinFlag<ReactNode>,
  ) => boolean | CalendarPinFlag<ReactNode> | Promise<boolean | CalendarPinFlag<ReactNode>>;
  autoFit?: boolean;
  currentTimeLine?: boolean;
  /** Renders the complete Calendar header region. */
  renderHeader?: () => ReactNode;
  renderDateCell?: (context: CalendarCellContext) => ReactNode;
  renderDateCellTitle?: (context: CalendarCellContext) => ReactNode;
  renderDateCellAppend?: (context: CalendarCellContext) => ReactNode;
  renderMonthHeader?: (month: Date) => ReactNode;
  renderWeekDayHeader?: (context: CalendarCellContext) => ReactNode;
  renderDayHeader?: (context: CalendarCellContext) => ReactNode;
  renderTimezone?: (timezone: number, date: Date) => ReactNode;
}

export interface CalendarHandle {
  readonly element: HTMLDivElement | null;
  /** Moves by one unit of the active view. */
  previous(): void;
  /** Moves by one unit of the active view. */
  next(): void;
  /** Moves to the current local date. */
  today(): void;
  /** Proposes a date through the shared Calendar model. */
  setDate(value: CalendarValue): void;
  /** Proposes a view through the shared Calendar model. */
  setMode(mode: CalendarMode): void;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const pad = (value: number) => String(value).padStart(2, '0');
const formatDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const sameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
const toDate = (value: CalendarValue | undefined) => {
  const date = value instanceof Date ? new Date(value) : new Date(value ?? Date.now());
  return Number.isFinite(date.getTime()) ? date : new Date();
};
const flagId = (flag: CalendarPinFlag, index: number) => flag.id ?? `calendar-flag-${index}`;

export const Calendar = forwardRef<CalendarHandle, CalendarProps>(function Calendar(allProps, ref) {
  const valueControlled = Object.hasOwn(allProps, 'value');
  const modeControlled = Object.hasOwn(allProps, 'mode');
  const flagsControlled = Object.hasOwn(allProps, 'pinFlags');
  const {
    value,
    defaultValue,
    onValueChange,
    mode,
    defaultMode,
    onModeChange,
    modeSwitchable = CALENDAR_DEFAULTS.modeSwitchable,
    modeSwitchableList = CALENDAR_DEFAULTS.modeSwitchableList,
    dateType = CALENDAR_DEFAULTS.dateType,
    hourFormat = CALENDAR_DEFAULTS.hourFormat,
    defaultStartHour = CALENDAR_DEFAULTS.defaultStartHour,
    pickable = CALENDAR_DEFAULTS.pickable,
    disabledDate,
    disabledHours,
    pinFlags,
    defaultPinFlags = [],
    onPinFlagsChange,
    onPinFlagClick,
    pinFlagsShowTime = CALENDAR_DEFAULTS.pinFlagsShowTime,
    enableCreatePinFlags = CALENDAR_DEFAULTS.enableCreatePinFlags,
    createFlagCanThroughDisabledRange = CALENDAR_DEFAULTS.createFlagCanThroughDisabledRange,
    onCreatePinFlag,
    autoFit = CALENDAR_DEFAULTS.autoFit,
    currentTimeLine = CALENDAR_DEFAULTS.currentTimeLine,
    renderHeader,
    renderDateCell,
    renderDateCellTitle,
    renderDateCellAppend,
    renderMonthHeader,
    renderWeekDayHeader,
    renderDayHeader,
    renderTimezone,
    className,
    onKeyDown,
    ...nativeProps
  } = allProps;
  const config = useHorizonWebConfig();
  const rootRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef({ onValueChange, onModeChange });
  latestRef.current = { onValueChange, onModeChange };
  const modelRef = useRef<CalendarModel | undefined>(undefined);
  if (!modelRef.current) {
    modelRef.current = createCalendarModel({
      value,
      defaultValue,
      mode,
      defaultMode,
      modes: modeSwitchableList,
      controlledValue: valueControlled,
      controlledMode: modeControlled,
    });
  }
  const [state, setState] = useState(() => modelRef.current!.getState());
  useLayoutEffect(() => modelRef.current!.subscribe(setState), []);
  useLayoutEffect(() => {
    modelRef.current!.update({
      value,
      mode,
      modes: modeSwitchableList,
      controlledValue: valueControlled,
      controlledMode: modeControlled,
      onValueChange: (next, details) =>
        latestRef.current.onValueChange?.(new Date(next), {
          mode: modelRef.current!.getState().mode,
          reason: details.reason,
        }),
      onModeChange: next => latestRef.current.onModeChange?.(next),
    });
    setState(modelRef.current!.getState());
  }, [mode, modeControlled, modeSwitchableList, value, valueControlled]);
  useEffect(() => () => modelRef.current?.destroy(), []);

  const schedule = useMemo(
    () =>
      createCalendarSchedule<CalendarPinFlag<ReactNode>>({
        items: pinFlags,
        defaultItems: defaultPinFlags,
        controlled: flagsControlled,
        getId: (flag, index?: number) => flag.id ?? String(index ?? flag.startAt),
        getStart: flag => toDate(flag.startAt).getTime(),
        getEnd: flag => toDate(flag.endAt ?? flag.startAt).getTime(),
      }),
    [],
  );
  const [renderedFlags, setRenderedFlags] = useState(() =>
    schedule.getEntries().map(entry => entry.item),
  );
  useLayoutEffect(() => schedule.subscribe(items => setRenderedFlags([...items])), [schedule]);
  useLayoutEffect(() => {
    schedule.update({
      items: pinFlags,
      controlled: flagsControlled,
      onItemsChange: items => onPinFlagsChange?.(items),
    });
    setRenderedFlags(schedule.getEntries().map(entry => entry.item));
  }, [flagsControlled, onPinFlagsChange, pinFlags, schedule]);
  useEffect(() => () => schedule.destroy(), [schedule]);

  const selectedDate = new Date(state.value);
  const today = new Date();
  const selectDate = useCallback(
    (date: Date) => {
      if (!pickable || disabledDate?.(date)) return;
      modelRef.current!.setDate(date);
    },
    [disabledDate, pickable],
  );
  const cellContext = useCallback(
    (date: Date, current = true): CalendarCellContext => ({
      date,
      value: formatDate(date),
      mode: state.mode,
      current,
      today: sameDay(date, today),
      selected: sameDay(date, selectedDate),
      disabled: disabledDate?.(date) ?? false,
    }),
    [disabledDate, selectedDate, state.mode],
  );

  useImperativeHandle(
    ref,
    () => ({
      get element() {
        return rootRef.current;
      },
      previous: () => void modelRef.current!.previous(),
      next: () => void modelRef.current!.next(),
      today: () => void modelRef.current!.today(),
      setDate: next => void modelRef.current!.setDate(next),
      setMode: next => void modelRef.current!.setMode(next),
    }),
    [],
  );

  const activateCell = (event: KeyboardEvent<HTMLElement>, date: Date) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectDate(date);
    }
  };
  const renderFlag = (flag: CalendarPinFlag<ReactNode>, index: number, style?: CSSProperties) => (
    <button
      className={`h-calendar-${state.mode === 'month' ? 'month' : state.mode}__flag h-calendar-${state.mode === 'month' ? 'month' : state.mode}__flag--${flag.type ?? 'default'}${flag.clickable ? ' is-clickable' : ''}`}
      data-calendar-flag={flagId(flag, index)}
      disabled={!flag.clickable}
      key={flagId(flag, index)}
      onClick={() => onPinFlagClick?.(flag)}
      style={style}
      title={typeof flag.tooltip === 'string' ? flag.tooltip : undefined}
      type="button"
    >
      {flag.title}
      {(flag.showTime ?? pinFlagsShowTime) && (
        <time>
          {toDate(flag.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      )}
    </button>
  );
  const flagsForDate = (date: Date) =>
    renderedFlags.filter(flag => {
      const start = toDate(flag.startAt);
      const end = toDate(flag.endAt ?? flag.startAt);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
      return start.getTime() < dayEnd && end.getTime() >= dayStart;
    });

  const timelineFlagsForDate = (date: Date) => {
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
    const positioned = layoutCalendarRanges(
      schedule.getInRange({ start: dayStart, end: dayEnd }).map(entry => ({
        ...entry,
        ...intersectCalendarRanges(entry, { start: dayStart, end: dayEnd })!,
      })),
    );
    const laneCount = Math.max(1, ...positioned.map(entry => entry.lane + 1));
    return positioned.map(({ range, lane }, index) => ({
      flag: range.item,
      index,
      style: {
        top: `${((range.start - dayStart) / (dayEnd - dayStart)) * 100}%`,
        height: `${Math.max(0.5, ((range.end - range.start) / (dayEnd - dayStart)) * 100)}%`,
        left: `${(lane / laneCount) * 100}%`,
        width: `${100 / laneCount}%`,
      } satisfies CSSProperties,
    }));
  };

  const renderMonth = () => {
    const dates = createCalendarMonthGrid(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      dateType,
    );
    return (
      <div className="h-calendar-month" role="grid">
        <div className="h-calendar-month__week-wrapper" role="row">
          {DAY_NAMES.map(name => (
            <div className="h-calendar-month__week" key={name} role="columnheader">
              {name}
            </div>
          ))}
        </div>
        <div className="h-calendar-month__day-wrapper">
          {dates.map(timestamp => {
            const date = new Date(timestamp);
            const context = cellContext(date, date.getMonth() === selectedDate.getMonth());
            return (
              <div
                aria-disabled={context.disabled || undefined}
                aria-selected={context.selected}
                className={`h-calendar-month__day${context.current ? ' is-current-month' : ''}${context.today ? ' is-today' : ''}`}
                data-calendar-date={context.value}
                key={timestamp}
                onClick={() => selectDate(date)}
                onKeyDown={event => activateCell(event, date)}
                role="gridcell"
                tabIndex={context.selected ? 0 : -1}
              >
                {renderDateCell?.(context) ?? (
                  <>
                    <div className="h-calendar-month__day--header">
                      {renderDateCellTitle?.(context) ?? date.getDate()}
                    </div>
                    <div className="h-calendar-month__flags">
                      {flagsForDate(date).map((flag, index) => renderFlag(flag, index))}
                    </div>
                    {renderDateCellAppend?.(context)}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const renderYear = () => (
    <div className="h-calendar-year" role="grid">
      {Array.from({ length: 12 }, (_, month) => {
        const monthDate = new Date(selectedDate.getFullYear(), month, 1);
        return (
          <section className="h-calendar-year__month" key={month}>
            <header className="h-calendar-year__month--header">
              {renderMonthHeader?.(monthDate) ??
                monthDate.toLocaleString(config.locale, { month: 'long' })}
            </header>
            <div className="h-calendar-year__month--body">
              {createCalendarMonthGrid(selectedDate.getFullYear(), month, 'only-current').map(
                timestamp => {
                  const date = new Date(timestamp);
                  const context = cellContext(date, date.getMonth() === month);
                  return (
                    <button
                      aria-disabled={context.disabled || undefined}
                      aria-selected={context.selected}
                      className={`h-calendar-year__month--day${context.current ? ' is-current-month' : ''}`}
                      disabled={context.disabled}
                      key={timestamp}
                      onClick={() => selectDate(date)}
                      role="gridcell"
                      type="button"
                    >
                      {date.getDate()}
                    </button>
                  );
                },
              )}
            </div>
          </section>
        );
      })}
    </div>
  );

  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineScrollerRef = useRef<CalendarTimelineScroller | undefined>(undefined);
  const activeDayRef = useRef<Date>(selectedDate);
  const selectionAnchorRef = useRef<Date | null>(null);
  const activeColumnRef = useRef<HTMLElement | null>(null);
  const temporaryFlagRef = useRef<CalendarPinFlag<ReactNode> | null>(null);
  const pointerRef = useRef<CalendarPointerSelectionController | undefined>(undefined);
  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline || (state.mode !== 'week' && state.mode !== 'day')) return;
    const scroller = createCalendarTimelineScroller({
      getScroller: () => timelineRef.current,
      getHourHeight: () => {
        const grid = timeline.querySelector<HTMLElement>('[data-calendar-day]');
        const measured = grid ? grid.scrollHeight / 24 : 0;
        if (measured > 0) return measured;
        const token = getComputedStyle(document.documentElement).getPropertyValue(
          '--h-calendar-size-week-hour-cell-height',
        );
        return Number.parseFloat(token) || 60;
      },
    });
    timelineScrollerRef.current = scroller;
    scroller.scrollToHour(defaultStartHour);
    return () => {
      scroller.destroy();
      if (timelineScrollerRef.current === scroller) timelineScrollerRef.current = undefined;
    };
  }, [defaultStartHour, state.mode]);

  useEffect(() => {
    const owner = timelineRef.current;
    if (!owner || !enableCreatePinFlags || (state.mode !== 'week' && state.mode !== 'day')) return;
    const updateTemporaryFlag = (date: Date) => {
      const flag = temporaryFlagRef.current;
      const anchor = selectionAnchorRef.current?.getTime();
      if (!flag || anchor === undefined) return false;
      const range = resolveCalendarSelectionRange({
        anchor,
        current: date.getTime(),
        minimumDuration: 1_800_000,
        disabledRanges: (disabledHours?.(activeDayRef.current) ?? []).map(([start, end]) => ({
          start: start.getTime(),
          end: end.getTime(),
        })),
        canCrossDisabledRange: createFlagCanThroughDisabledRange,
      });
      if (!range) return false;
      flag.startAt = new Date(range.start);
      flag.endAt = new Date(range.end);
      return true;
    };
    pointerRef.current = createCalendarPointerSelection({
      owner,
      canStart: event => {
        activeColumnRef.current =
          event.target instanceof Element
            ? event.target.closest<HTMLElement>('[data-calendar-day]')
            : null;
        return activeColumnRef.current !== null;
      },
      resolveValue: event => {
        const candidate =
          event.target instanceof Element
            ? event.target.closest<HTMLElement>('[data-calendar-day]')
            : null;
        const column = candidate ?? activeColumnRef.current!;
        activeColumnRef.current = column;
        activeDayRef.current = new Date(column.dataset.calendarDay!);
        const rect = column.getBoundingClientRect();
        const minutes = Math.max(
          0,
          Math.min(24 * 60, Math.round((((event.clientY - rect.top) / 60) * 60) / 30) * 30),
        );
        return new Date(
          activeDayRef.current.getFullYear(),
          activeDayRef.current.getMonth(),
          activeDayRef.current.getDate(),
          0,
          minutes,
        );
      },
      onStart: date => {
        const initialRange = resolveCalendarSelectionRange({
          anchor: date.getTime(),
          current: date.getTime(),
          minimumDuration: 1_800_000,
          disabledRanges: (disabledHours?.(date) ?? []).map(([start, end]) => ({
            start: start.getTime(),
            end: end.getTime(),
          })),
          canCrossDisabledRange: createFlagCanThroughDisabledRange,
        });
        if (!initialRange) return false;
        selectionAnchorRef.current = date;
        temporaryFlagRef.current = {
          id: `created-${Date.now()}`,
          title: 'New event',
          startAt: new Date(initialRange.start),
          endAt: new Date(initialRange.end),
        };
      },
      onMove: updateTemporaryFlag,
      onCommit: async date => {
        const accepted = updateTemporaryFlag(date);
        const flag = temporaryFlagRef.current!;
        temporaryFlagRef.current = null;
        selectionAnchorRef.current = null;
        if (!flag || !accepted) return;
        const result = await onCreatePinFlag?.(flag);
        if (result === false) return;
        schedule.add(typeof result === 'object' ? result : flag);
      },
      onCancel: () => {
        temporaryFlagRef.current = null;
        selectionAnchorRef.current = null;
      },
    });
    return () => pointerRef.current?.destroy();
  }, [
    createFlagCanThroughDisabledRange,
    disabledHours,
    enableCreatePinFlags,
    onCreatePinFlag,
    schedule,
    state.mode,
  ]);

  const renderTimeline = () => {
    const dates =
      state.mode === 'week' ? createCalendarWeek(selectedDate) : [selectedDate.getTime()];
    const timezone = new Date().getTimezoneOffset() / 60;
    return (
      <div className={`h-calendar-${state.mode}`}>
        <div className={`h-calendar-${state.mode}__header`}>
          <div className={`h-calendar-${state.mode}__header--time-zone`}>
            {renderTimezone?.(timezone, selectedDate) ??
              `GMT ${new Intl.NumberFormat('en', { signDisplay: 'always' }).format(-timezone)}`}
          </div>
          <div className={`h-calendar-${state.mode}__header--dates`}>
            {dates.map(timestamp => {
              const date = new Date(timestamp);
              const context = cellContext(date);
              return (
                <div className={`h-calendar-${state.mode}__header--date`} key={timestamp}>
                  {state.mode === 'week'
                    ? (renderWeekDayHeader?.(context) ??
                      `${DAY_NAMES[date.getDay()]} ${date.getDate()}`)
                    : (renderDayHeader?.(context) ?? formatDate(date))}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`h-calendar-${state.mode}__body is-native-timeline`}
          data-calendar-timeline=""
          ref={timelineRef}
          style={{ '--calendar-start-hour': defaultStartHour } as CSSProperties}
        >
          <div className={`h-calendar-${state.mode}__body--time-scroll`}>
            {Array.from({ length: 24 }, (_, hour) => (
              <div className={`h-calendar-${state.mode}__body--time-label`} key={hour}>
                {hourFormat === '12'
                  ? new Date(2000, 0, 1, hour).toLocaleTimeString([], { hour: 'numeric' })
                  : `${pad(hour)}:00`}
              </div>
            ))}
          </div>
          <div className={`h-calendar-${state.mode}__body--date-grids`}>
            {dates.map(timestamp => {
              const date = new Date(timestamp);
              return (
                <div
                  className={`h-calendar-${state.mode}__body--date-grid-column`}
                  data-calendar-day={formatDate(date)}
                  key={timestamp}
                >
                  {timelineFlagsForDate(date).map(({ flag, index, style }) =>
                    renderFlag(flag, index, style),
                  )}
                  {(disabledHours?.(date) ?? []).map(([start, end], index) => {
                    const dayStart = new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                    ).getTime();
                    const dayEnd = new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + 1,
                    ).getTime();
                    const range = intersectCalendarRanges(
                      { start: start.getTime(), end: end.getTime() },
                      { start: dayStart, end: dayEnd },
                    );
                    if (!range) return null;
                    return (
                      <div
                        aria-label={config.calendarLabels.disabledTime}
                        className={`h-calendar-${state.mode}__body--disabled-hours`}
                        key={`${range.start}-${range.end}-${index}`}
                        role="note"
                        style={{
                          top: `${((range.start - dayStart) / (dayEnd - dayStart)) * 100}%`,
                          height: `${((range.end - range.start) / (dayEnd - dayStart)) * 100}%`,
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          {currentTimeLine && dates.some(timestamp => sameDay(new Date(timestamp), today)) && (
            <div className={`h-calendar-${state.mode}__body--current-time`} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      {...nativeProps}
      aria-label={nativeProps['aria-label'] ?? config.calendarLabels.calendar}
      className={`h-calendar${autoFit ? ' is-auto-fit' : ''}${className ? ` ${className}` : ''}`}
      onKeyDown={onKeyDown}
      ref={rootRef}
    >
      <div className="h-calendar__header">
        <div className="h-calendar__header--switcher-wrapper">
          <button
            className="h-calendar__header--today"
            onClick={() => modelRef.current!.today()}
            type="button"
          >
            {config.calendarLabels.today}
          </button>
          <button
            aria-label={config.calendarLabels.previous}
            className="h-calendar__header--switcher-item"
            onClick={() => modelRef.current!.previous()}
            type="button"
          >
            ‹
          </button>
          <time className="h-calendar__header--switcher-date">
            {state.mode === 'year'
              ? selectedDate.getFullYear()
              : state.mode === 'day'
                ? formatDate(selectedDate)
                : `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}`}
          </time>
          <button
            aria-label={config.calendarLabels.next}
            className="h-calendar__header--switcher-item"
            onClick={() => modelRef.current!.next()}
            type="button"
          >
            ›
          </button>
        </div>
        <div className="h-calendar__header--suffix">{renderHeader?.()}</div>
        {modeSwitchable && (
          <select
            aria-label={config.calendarLabels.view}
            className="h-calendar__header--mode-switcher"
            onChange={event => modelRef.current!.setMode(event.target.value as CalendarMode)}
            value={state.mode}
          >
            {modeSwitchableList.map(item => (
              <option key={item} value={item}>
                {config.calendarLabels[item]}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="h-calendar__body">
        {state.mode === 'month'
          ? renderMonth()
          : state.mode === 'year'
            ? renderYear()
            : renderTimeline()}
      </div>
    </div>
  );
});
