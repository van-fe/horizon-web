import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const TIMELINE_SORTS = ['', 'order', 'reverse'] as const;
export const TIMELINE_DOT_TYPES = ['disc', 'circle'] as const;
export const TIMELINE_DOT_SIZES = ['small', 'medium', 'large'] as const;
export const TIMELINE_TIMESTAMP_PLACEMENTS = ['top', 'bottom', 'right'] as const;

export type TimelineSort = (typeof TIMELINE_SORTS)[number];
export type TimelineDotType = (typeof TIMELINE_DOT_TYPES)[number];
export type TimelineDotSize = (typeof TIMELINE_DOT_SIZES)[number];
export type TimelineTimestampPlacement = (typeof TIMELINE_TIMESTAMP_PLACEMENTS)[number];
export type TimelineTimestamp = string | number | Date;

export interface TimelineDotCommonProps<Icon = unknown> {
  /** 节点形状。 @en Node shape. */
  type?: TimelineDotType;
  /** 节点前景色或填充色。 @en Node foreground or fill color. */
  color?: string;
  /** 节点边框颜色。 @en Node border color. */
  borderColor?: string;
  /** 节点尺寸。 @en Node size. */
  size?: TimelineDotSize;
  /** 由 renderer 解析的节点图标。 @en Node icon interpreted by the renderer. */
  icon?: Icon;
}

export interface TimelineFoldCommonProps<Content = string, Icon = unknown> {
  /** 该折叠节点控制的后续条目数。 @en Number of following items controlled by this fold. */
  number: number;
  /** 后续条目折叠时显示的内容。 @en Content shown while the following items are folded. */
  content: Content;
  /** 可选的折叠控件可访问名称。 @en Optional accessible fold control label. */
  label?: string;
  /** 折叠时的节点展示。 @en Node presentation used while folded. */
  dot?: TimelineDotCommonProps<Icon>;
}

export interface TimelineCommonProps<Icon = unknown> {
  /** 时间排序策略；空值保留源顺序。 @en Chronological ordering strategy; an empty value preserves source order. */
  sort?: TimelineSort;
  /** 首条记录的节点展示覆盖。 @en Presentation overrides for the first item. */
  first?: TimelineDotCommonProps<Icon>;
  /** 尾条记录的节点展示覆盖。 @en Presentation overrides for the final item. */
  last?: TimelineDotCommonProps<Icon>;
}

export interface TimelineItemCommonProps<
  Name = string,
  Description = string,
  Icon = unknown,
  FoldContent = string,
> extends TimelineDotCommonProps<Icon> {
  /** 用于展示和时间排序的时间戳。 @en Timestamp used for display and chronological ordering. */
  timestamp?: TimelineTimestamp;
  /** 兼容 Day.js 的时间格式。 @en Day.js-compatible timestamp format. */
  format?: string;
  /** 时间戳位置。 @en Timestamp placement. */
  placement?: TimelineTimestampPlacement;
  /** 连接线上下留白。 @en Vertical spacing around the connecting tail. */
  offset?: string | number;
  /** 连接线颜色。 @en Connecting tail color. */
  tailColor?: string;
  /** 记录名称内容。 @en Item name content. */
  name?: Name;
  /** 记录描述内容。 @en Item description content. */
  description?: Description;
  /** 是否使用虚线连接。 @en Whether the connecting tail is dashed. */
  dashed?: boolean;
  /** 可选的后续记录折叠配置。 @en Optional folding behavior for following items. */
  foldConfig?: TimelineFoldCommonProps<FoldContent, Icon>;
  /** 是否渲染连接线。 @en Whether the connecting tail is rendered. */
  tail?: boolean;
}

export interface TimelineRegionMap {
  /** 时间线条目。 @en Timeline items. */
  content: EmptyComponentApi;
}

export interface TimelineItemRegionMap {
  /** 后续条目折叠时的节点内容。 @en Node content while following items are folded. */
  hiddenDot: EmptyComponentApi;
  /** 节点内容。 @en Node content. */
  dot: EmptyComponentApi;
  /** 记录名称内容。 @en Item name content. */
  name: EmptyComponentApi;
  /** 记录描述内容。 @en Item description content. */
  description: EmptyComponentApi;
}

export type TimelineEventMap = EmptyComponentApi;
export type TimelineItemEventMap = EmptyComponentApi;
export type TimelineCommandMap = EmptyComponentApi;
export type TimelineItemCommandMap = EmptyComponentApi;

export const TIMELINE_DEFAULTS = Object.freeze({
  sort: '',
} as const satisfies Partial<TimelineCommonProps>);

export const TIMELINE_ITEM_DEFAULTS = Object.freeze({
  timestamp: '',
  placement: 'bottom',
  offset: 4,
  type: 'disc',
  dashed: false,
  tail: true,
} as const satisfies Partial<TimelineItemCommonProps>);

export function isTimelineSort(value: unknown): value is TimelineSort {
  return TIMELINE_SORTS.includes(value as TimelineSort);
}

export function isTimelineDotType(value: unknown): value is TimelineDotType {
  return TIMELINE_DOT_TYPES.includes(value as TimelineDotType);
}

export function isTimelineDotSize(value: unknown): value is TimelineDotSize {
  return TIMELINE_DOT_SIZES.includes(value as TimelineDotSize);
}

export function isTimelineTimestampPlacement(value: unknown): value is TimelineTimestampPlacement {
  return TIMELINE_TIMESTAMP_PLACEMENTS.includes(value as TimelineTimestampPlacement);
}

export function normalizeTimelineTimestamp(value: unknown): Date | undefined {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : new Date(value.getTime());
  }

  let normalized: string | number;
  if (typeof value === 'number') {
    normalized =
      Math.abs(value) >= 1_000_000_000 && Math.abs(value) < 10_000_000_000 ? value * 1000 : value;
  } else if (typeof value === 'string') {
    if (/^\d+$/.test(value)) {
      const numeric = Number(value);
      normalized = value.length === 10 ? numeric * 1000 : numeric;
    } else {
      normalized = value.replace(/-/g, '/');
    }
  } else {
    return undefined;
  }

  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function sortTimelineItems<Item>(
  items: readonly Item[],
  sort: TimelineSort,
  getTimestamp: (item: Item) => unknown,
): Item[] {
  if (sort === '') return [...items];

  return items
    .map((item, index) => ({ item, index, date: normalizeTimelineTimestamp(getTimestamp(item)) }))
    .sort((left, right) => {
      if (!left.date && !right.date) return left.index - right.index;
      if (!left.date) return 1;
      if (!right.date) return -1;
      const difference = left.date.getTime() - right.date.getTime();
      return (sort === 'reverse' ? -difference : difference) || left.index - right.index;
    })
    .map(entry => entry.item);
}

export function getTimelineFoldIndexes(
  ownerIndex: number,
  number: number,
  itemCount: number,
): number[] {
  const count = Math.max(0, Math.trunc(number));
  const start = Math.max(-1, Math.trunc(ownerIndex)) + 1;
  const end = Math.min(Math.max(0, Math.trunc(itemCount)), start + count);
  return Array.from({ length: Math.max(0, end - start) }, (_, index) => start + index);
}

export function resolveTimelineDot<Icon>(
  item: TimelineDotCommonProps<Icon>,
  foldConfig: TimelineFoldCommonProps<unknown, Icon> | undefined,
  folded: boolean,
): TimelineDotCommonProps<Icon> {
  return folded ? { ...item, ...foldConfig?.dot } : { ...item };
}

export function resolveTimelineEndpointDot<Icon>(
  item: TimelineDotCommonProps<Icon>,
  index: number,
  itemCount: number,
  first: TimelineDotCommonProps<Icon> | undefined,
  last: TimelineDotCommonProps<Icon> | undefined,
): TimelineDotCommonProps<Icon> {
  if (index === 0 && first) return { ...item, ...first };
  if (index > 0 && index === itemCount - 1 && last) return { ...item, ...last };
  return { ...item };
}

export function toTimelineOffsetCss(value: string | number): string {
  return typeof value === 'number' || /^-?\d+(?:\.\d+)?$/.test(value) ? `${value}px` : value;
}

export const timelineApiContract = defineComponentApiContract<
  TimelineCommonProps,
  TimelineEventMap,
  TimelineRegionMap,
  TimelineCommandMap
>({
  defaults: TIMELINE_DEFAULTS,
  validators: { sort: isTimelineSort },
});

export const timelineItemApiContract = defineComponentApiContract<
  TimelineItemCommonProps,
  TimelineItemEventMap,
  TimelineItemRegionMap,
  TimelineItemCommandMap
>({
  defaults: TIMELINE_ITEM_DEFAULTS,
  validators: {
    placement: isTimelineTimestampPlacement,
    type: isTimelineDotType,
    size: isTimelineDotSize,
  },
});
