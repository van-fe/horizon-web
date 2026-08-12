import type { ComputedRef, CSSProperties, InjectionKey } from 'vue';
import { computed } from 'vue';
import type { GridAlignment, GridValue, ResolvedGridValue } from '@aurora/core';
import { resolveGridContainerStyle, resolveGridItemStyle } from '@aurora/horizon-web-core';

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
  align?: GridAlignment;
  justify?: GridAlignment;
};

type GridItemOptions = {
  span?: GridValue;
  offset?: GridValue;
};

export function useGridContainerStyle(props: GridContainerOptions, defaultCols = 24) {
  const resolved = computed(() => resolveGridContainerStyle(props, 'h', defaultCols));
  const cols = computed(() => resolved.value.context.cols);
  const columnGap = computed(() => resolved.value.context.columnGap);
  const style = computed<CSSProperties>(() => resolved.value.style);

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
  return computed<CSSProperties>(() => {
    return resolveGridItemStyle(
      props,
      { cols: grid.cols.value, columnGap: grid.columnGap.value },
      visibleDisplay,
    );
  });
}
