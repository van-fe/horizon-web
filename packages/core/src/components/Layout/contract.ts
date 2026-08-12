import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const GRID_BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
export const GRID_ALIGNMENTS = ['start', 'center', 'end', 'stretch'] as const;

export type GridBreakpoint = (typeof GRID_BREAKPOINTS)[number];
export type GridAlignment = (typeof GRID_ALIGNMENTS)[number];
export type GridResponsiveValue = Partial<Record<GridBreakpoint, number>>;
export type GridValue = number | GridResponsiveValue;
export type ResolvedGridValue = Record<GridBreakpoint, number>;

export interface GridCommonProps<Tag = string> {
  /** 渲染元素类型。 @en Element type to render. */
  tag?: Tag;
  /** 每行的网格列数。 @en Number of grid columns per row. */
  cols?: GridValue;
  /** 行列间距。 @en Gap between rows and columns. */
  gap?: GridValue;
  /** 列间距，优先于 gap。 @en Column gap, taking precedence over gap. */
  columnGap?: GridValue;
  /** 行间距，优先于 gap。 @en Row gap, taking precedence over gap. */
  rowGap?: GridValue;
  /** 网格项的垂直对齐方式。 @en Vertical alignment of grid items. */
  align?: GridAlignment;
  /** 网格项的水平对齐方式。 @en Horizontal alignment of grid items. */
  justify?: GridAlignment;
}

export interface GridItemCommonProps {
  /** 占据列数；0 表示在对应断点隐藏。 @en Occupied columns; zero hides the item at that breakpoint. */
  span?: GridValue;
  /** 左侧偏移列数。 @en Empty columns before the item. */
  offset?: GridValue;
}

export type GridEventMap = EmptyComponentApi;
export type GridItemEventMap = EmptyComponentApi;
export interface GridRegionMap {
  /** 网格内容。 @en Grid content. */
  content: EmptyComponentApi;
}
export interface GridItemRegionMap {
  /** 网格项内容。 @en Grid item content. */
  content: EmptyComponentApi;
}
export type GridCommandMap = EmptyComponentApi;
export type GridItemCommandMap = EmptyComponentApi;

export const GRID_DEFAULTS = Object.freeze({
  tag: 'div',
  cols: 24,
  align: 'stretch',
  justify: 'stretch',
} as const satisfies GridCommonProps);

export const GRID_ITEM_DEFAULTS = Object.freeze({
  span: 1,
  offset: 0,
} as const satisfies GridItemCommonProps);

export function isGridAlignment(value: unknown): value is GridAlignment {
  return GRID_ALIGNMENTS.includes(value as GridAlignment);
}

export function isGridValue(value: unknown): value is GridValue {
  if (typeof value === 'number') return Number.isFinite(value);
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return Object.entries(value).every(
    ([breakpoint, breakpointValue]) =>
      GRID_BREAKPOINTS.includes(breakpoint as GridBreakpoint) &&
      typeof breakpointValue === 'number' &&
      Number.isFinite(breakpointValue),
  );
}

export const gridApiContract = defineComponentApiContract<
  GridCommonProps,
  GridEventMap,
  GridRegionMap,
  GridCommandMap
>({
  defaults: GRID_DEFAULTS,
  validators: {
    cols: isGridValue,
    gap: isGridValue,
    columnGap: isGridValue,
    rowGap: isGridValue,
    align: isGridAlignment,
    justify: isGridAlignment,
  },
});

export const gridItemApiContract = defineComponentApiContract<
  GridItemCommonProps,
  GridItemEventMap,
  GridItemRegionMap,
  GridItemCommandMap
>({
  defaults: GRID_ITEM_DEFAULTS,
  validators: { span: isGridValue, offset: isGridValue },
});
