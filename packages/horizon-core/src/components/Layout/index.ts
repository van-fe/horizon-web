import type {
  GridCommonProps,
  GridItemCommonProps,
  ResolvedGridContainer,
  ResolvedGridValue,
} from '@aurora/core';
import { GRID_BREAKPOINTS, resolveGridContainer, resolveGridItem } from '@aurora/core';

export type GridStyle = Record<string, string>;

export interface ResolvedGridContainerStyle {
  context: ResolvedGridContainer;
  style: GridStyle;
}

function setResponsiveVariables(
  style: GridStyle,
  namespace: string,
  name: string,
  values: ResolvedGridValue,
  unit = '',
): void {
  for (const breakpoint of GRID_BREAKPOINTS) {
    style[`--${namespace}-grid-${name}-${breakpoint}`] = `${values[breakpoint]}${unit}`;
  }
}

function resolveOffsetMargin(totalSpan: number, offset: number, columnGap: number): string {
  if (!offset) return '0px';
  const occupiedGaps = (totalSpan - 1) * columnGap;
  const offsetGaps = columnGap * offset;
  return `calc((100% - ${occupiedGaps}px) / ${totalSpan} * ${offset} + ${offsetGaps}px)`;
}

/** 将公共 Grid 配置转换为 Web CSS 变量。 @en Converts shared Grid configuration into Web CSS variables. */
export function resolveGridContainerStyle(
  props: Pick<GridCommonProps, 'cols' | 'gap' | 'columnGap' | 'rowGap' | 'align' | 'justify'>,
  namespace = 'h',
  defaultCols = 24,
): ResolvedGridContainerStyle {
  const context = resolveGridContainer(props, defaultCols);
  const style: GridStyle = {};
  if (props.align) style.alignItems = props.align;
  if (props.justify) style.justifyItems = props.justify;
  setResponsiveVariables(style, namespace, 'cols', context.cols);
  setResponsiveVariables(style, namespace, 'column-gap', context.columnGap, 'px');
  setResponsiveVariables(style, namespace, 'row-gap', context.rowGap, 'px');
  return { context, style };
}

/** 将公共 GridItem 配置转换为 Web CSS 变量。 @en Converts shared GridItem configuration into Web CSS variables. */
export function resolveGridItemStyle(
  props: GridItemCommonProps,
  grid: Pick<ResolvedGridContainer, 'cols' | 'columnGap'>,
  visibleDisplay = 'block',
  namespace = 'h',
): GridStyle {
  const item = resolveGridItem(props, grid);
  const style: GridStyle = {};

  for (const breakpoint of GRID_BREAKPOINTS) {
    const breakpointItem = item[breakpoint];
    style[`--${namespace}-grid-item-display-${breakpoint}`] = breakpointItem.visible
      ? visibleDisplay
      : 'none';
    style[`--${namespace}-grid-item-span-${breakpoint}`] = String(breakpointItem.span);
    style[`--${namespace}-grid-item-offset-${breakpoint}`] = resolveOffsetMargin(
      breakpointItem.span,
      breakpointItem.offset,
      grid.columnGap[breakpoint],
    );
  }

  return style;
}
