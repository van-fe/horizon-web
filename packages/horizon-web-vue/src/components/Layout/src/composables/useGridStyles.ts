import type { ComputedRef, CSSProperties, InjectionKey } from 'vue';
import { computed } from 'vue';
import {
  GRID_BREAKPOINTS,
  resolveGridValue,
  type GridValue,
  type ResolvedGridValue,
} from './useGridProps';

export type GridProvide = {
  cols: ComputedRef<ResolvedGridValue>;
  columnGap: ComputedRef<ResolvedGridValue>;
};

export const GRID_KEY: InjectionKey<GridProvide> = Symbol('HorizonWeb-grid');

type GridContainerOptions = {
  cols?: GridValue;
  gap?: GridValue;
  columnGap?: GridValue;
  rowGap?: GridValue;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'stretch';
};

type GridItemOptions = {
  span?: GridValue;
  offset?: GridValue;
};

function setResponsiveVariables(
  style: Record<string, string>,
  name: string,
  values: ResolvedGridValue,
  unit = '',
) {
  GRID_BREAKPOINTS.forEach(breakpoint => {
    style[`--h-grid-${name}-${breakpoint}`] = `${values[breakpoint]}${unit}`;
  });
}

function getOffsetMargin(totalSpan: number, offset: number, columnGap: number) {
  if (!offset) {
    return '0px';
  }

  const occupiedGaps = (totalSpan - 1) * columnGap;
  const offsetGaps = columnGap * offset;
  return `calc((100% - ${occupiedGaps}px) / ${totalSpan} * ${offset} + ${offsetGaps}px)`;
}

export function useGridContainerStyle(props: GridContainerOptions, defaultCols = 24) {
  const cols = computed(() => resolveGridValue(props.cols, defaultCols, { integer: true, min: 1 }));
  const gap = computed(() => resolveGridValue(props.gap, 0, { min: 0 }));
  const columnGap = computed(() => resolveGridValue(props.columnGap, gap.value, { min: 0 }));
  const rowGap = computed(() => resolveGridValue(props.rowGap, gap.value, { min: 0 }));
  const style = computed<CSSProperties>(() => {
    const result: Record<string, string> = {};
    if (props.align) result.alignItems = props.align;
    if (props.justify) result.justifyItems = props.justify;
    setResponsiveVariables(result, 'cols', cols.value);
    setResponsiveVariables(result, 'column-gap', columnGap.value, 'px');
    setResponsiveVariables(result, 'row-gap', rowGap.value, 'px');
    return result;
  });

  return {
    context: { cols, columnGap },
    style,
  };
}

export function useGridItemStyle(
  props: GridItemOptions,
  grid: GridProvide,
  visibleDisplay = 'block',
) {
  const spans = computed(() => resolveGridValue(props.span, 1, { integer: true, min: 0 }));
  const offsets = computed(() => resolveGridValue(props.offset, 0, { integer: true, min: 0 }));

  return computed<CSSProperties>(() => {
    const style: Record<string, string> = {};

    GRID_BREAKPOINTS.forEach(breakpoint => {
      const columnCount = grid.cols.value[breakpoint];
      const span = Math.min(spans.value[breakpoint], columnCount);
      const offset = Math.min(offsets.value[breakpoint], Math.max(0, columnCount - 1));
      const totalSpan = Math.max(1, Math.min(span + offset, columnCount));

      style[`--h-grid-item-display-${breakpoint}`] = span === 0 ? 'none' : visibleDisplay;
      style[`--h-grid-item-span-${breakpoint}`] = String(totalSpan);
      style[`--h-grid-item-offset-${breakpoint}`] = getOffsetMargin(
        totalSpan,
        offset,
        grid.columnGap.value[breakpoint],
      );
    });

    return style;
  });
}
