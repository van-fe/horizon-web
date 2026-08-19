export interface CalendarTimestampRange {
  start: number;
  end: number;
}

export interface CalendarPositionedRange<Range extends CalendarTimestampRange> {
  range: Range;
  lane: number;
}

export interface CalendarSelectionRangeOptions {
  anchor: number;
  current: number;
  minimumDuration?: number;
  disabledRanges?: readonly CalendarTimestampRange[];
  canCrossDisabledRange?: boolean;
}

export interface CalendarScheduleEntry<Item> extends CalendarTimestampRange {
  id: string;
  item: Item;
}

export interface CalendarScheduleOptions<Item> {
  items?: readonly Item[];
  defaultItems?: readonly Item[];
  controlled?: boolean;
  getId: (item: Item) => string;
  getStart: (item: Item) => number;
  getEnd: (item: Item) => number;
  onItemsChange?: (items: readonly Item[], reason: 'add' | 'update' | 'remove') => void;
}

export interface CalendarSchedule<Item> {
  getItems(): readonly Item[];
  getEntries(): readonly CalendarScheduleEntry<Item>[];
  getLanes(): readonly (readonly CalendarScheduleEntry<Item>[])[];
  getInRange(range: CalendarTimestampRange): readonly CalendarScheduleEntry<Item>[];
  subscribe(listener: (items: readonly Item[]) => void): () => void;
  update(options: Partial<CalendarScheduleOptions<Item>>): void;
  add(item: Item): boolean;
  replace(id: string, item: Item): boolean;
  remove(id: string): boolean;
  destroy(): void;
}

export const normalizeCalendarRange = (range: CalendarTimestampRange): CalendarTimestampRange =>
  range.start <= range.end ? range : { start: range.end, end: range.start };

export function calendarRangesOverlap(
  first: CalendarTimestampRange,
  second: CalendarTimestampRange,
): boolean {
  const a = normalizeCalendarRange(first);
  const b = normalizeCalendarRange(second);
  return a.start < b.end && a.end > b.start;
}

export function intersectCalendarRanges(
  first: CalendarTimestampRange,
  second: CalendarTimestampRange,
): CalendarTimestampRange | undefined {
  if (!calendarRangesOverlap(first, second)) return undefined;
  const a = normalizeCalendarRange(first);
  const b = normalizeCalendarRange(second);
  return { start: Math.max(a.start, b.start), end: Math.min(a.end, b.end) };
}

export function subtractCalendarRange(
  source: CalendarTimestampRange,
  excluded: CalendarTimestampRange,
): CalendarTimestampRange[] {
  const current = normalizeCalendarRange(source);
  const overlap = intersectCalendarRanges(current, excluded);
  if (!overlap) return [current];
  const result: CalendarTimestampRange[] = [];
  if (current.start < overlap.start) result.push({ start: current.start, end: overlap.start });
  if (overlap.end < current.end) result.push({ start: overlap.end, end: current.end });
  return result;
}

export function mergeCalendarRanges(
  ranges: readonly CalendarTimestampRange[],
): CalendarTimestampRange[] {
  const result: CalendarTimestampRange[] = [];
  for (const range of ranges
    .map(normalizeCalendarRange)
    .sort((a, b) => a.start - b.start || a.end - b.end)) {
    const previous = result.at(-1);
    if (!previous || previous.end < range.start) result.push({ ...range });
    else previous.end = Math.max(previous.end, range.end);
  }
  return result;
}

/**
 * Resolves a drag-created range against disabled intervals without depending on a renderer clock.
 * When crossing is disabled, the result stops at the first blocked interval in the drag direction.
 */
export function resolveCalendarSelectionRange(
  options: CalendarSelectionRangeOptions,
): CalendarTimestampRange | undefined {
  const minimumDuration = Math.max(0, options.minimumDuration ?? 0);
  const forward = options.current >= options.anchor;
  let current = normalizeCalendarRange({
    start: forward ? options.anchor : options.current,
    end: forward
      ? Math.max(options.current, options.anchor + minimumDuration)
      : Math.max(options.anchor, options.current + minimumDuration),
  });

  for (const disabled of mergeCalendarRanges(options.disabledRanges ?? [])) {
    const available = subtractCalendarRange(current, disabled);
    if (available.length === 0) return undefined;
    if (available.length === 1) {
      current = available[0];
      continue;
    }
    current = options.canCrossDisabledRange
      ? { start: available[0].start, end: available.at(-1)!.end }
      : forward
        ? available[0]
        : available.at(-1)!;
  }
  return current.end > current.start ? current : undefined;
}

export function layoutCalendarRanges<Range extends CalendarTimestampRange>(
  ranges: readonly Range[],
): CalendarPositionedRange<Range>[] {
  const lanes: Range[][] = [];
  return [...ranges]
    .sort((a, b) => a.start - b.start || b.end - a.end)
    .map(range => {
      let lane = lanes.findIndex(items => items.every(item => !calendarRangesOverlap(item, range)));
      if (lane < 0) lanes.push([]);
      lane = lane < 0 ? lanes.length - 1 : lane;
      lanes[lane].push(range);
      return { range, lane };
    });
}

export function groupCalendarRangesByLane<Range extends CalendarTimestampRange>(
  ranges: readonly Range[],
): Range[][] {
  const lanes: Range[][] = [];
  for (const item of layoutCalendarRanges(ranges)) (lanes[item.lane] ??= []).push(item.range);
  return lanes;
}

/** Groups transitively overlapping ranges while preserving the original range objects. */
export function groupOverlappingCalendarRanges<Range extends CalendarTimestampRange>(
  ranges: readonly Range[],
): Range[][] {
  const groups: Range[][] = [];
  const envelopes: CalendarTimestampRange[] = [];
  for (const range of [...ranges].sort((a, b) => a.start - b.start || b.end - a.end)) {
    const previous = envelopes.at(-1);
    if (!previous || !calendarRangesOverlap(previous, range)) {
      groups.push([range]);
      envelopes.push(normalizeCalendarRange(range));
      continue;
    }
    groups.at(-1)!.push(range);
    previous.start = Math.min(previous.start, range.start, range.end);
    previous.end = Math.max(previous.end, range.start, range.end);
  }
  return groups;
}

export function createCalendarSchedule<Item>(
  initial: CalendarScheduleOptions<Item>,
): CalendarSchedule<Item> {
  let options = { ...initial };
  let items = [...(initial.items ?? initial.defaultItems ?? [])];
  let destroyed = false;
  const listeners = new Set<(items: readonly Item[]) => void>();
  const entries = () =>
    items.map(item => {
      const range = normalizeCalendarRange({
        start: options.getStart(item),
        end: options.getEnd(item),
      });
      return { id: options.getId(item), item, ...range };
    });
  const propose = (next: Item[], reason: 'add' | 'update' | 'remove') => {
    options.onItemsChange?.(next, reason);
    if (!options.controlled) {
      items = next;
      for (const listener of listeners) listener([...items]);
    }
  };

  return {
    getItems: () => [...items],
    getEntries: entries,
    getLanes: () => groupCalendarRangesByLane(entries()),
    getInRange: range => entries().filter(entry => calendarRangesOverlap(entry, range)),
    subscribe(listener) {
      if (destroyed) return () => {};
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update(next) {
      if (destroyed) return;
      options = { ...options, ...next };
      if (Object.hasOwn(next, 'items') && next.items) {
        items = [...next.items];
        for (const listener of listeners) listener([...items]);
      }
    },
    add(item) {
      if (destroyed || items.some(value => options.getId(value) === options.getId(item)))
        return false;
      propose([...items, item], 'add');
      return true;
    },
    replace(id, item) {
      if (destroyed) return false;
      const index = items.findIndex(value => options.getId(value) === id);
      if (index < 0) return false;
      const next = [...items];
      next[index] = item;
      propose(next, 'update');
      return true;
    },
    remove(id) {
      if (destroyed || !items.some(value => options.getId(value) === id)) return false;
      propose(
        items.filter(value => options.getId(value) !== id),
        'remove',
      );
      return true;
    },
    destroy() {
      destroyed = true;
      listeners.clear();
    },
  };
}
