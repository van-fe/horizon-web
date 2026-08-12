import type {
  GridBreakpoint,
  GridCommonProps,
  GridItemCommonProps,
  GridValue,
  ResolvedGridValue,
} from './contract';
import { GRID_BREAKPOINTS } from './contract';

export interface ResolveGridValueOptions {
  integer?: boolean;
  min?: number;
}

export interface ResolvedGridContainer {
  cols: ResolvedGridValue;
  columnGap: ResolvedGridValue;
  rowGap: ResolvedGridValue;
}

export interface ResolvedGridItemBreakpoint {
  visible: boolean;
  span: number;
  offset: number;
}

export type ResolvedGridItem = Record<GridBreakpoint, ResolvedGridItemBreakpoint>;

function normalizeGridNumber(
  value: unknown,
  fallback: number,
  options: ResolveGridValueOptions,
): number {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  const normalizedValue = options.integer ? Math.trunc(numericValue) : numericValue;
  return options.min === undefined ? normalizedValue : Math.max(options.min, normalizedValue);
}

/** 将标量或断点对象解析为完整的六档响应式值。 @en Resolves a scalar or breakpoint map into all six responsive values. */
export function resolveGridValue(
  value: GridValue | undefined,
  fallback: number | ResolvedGridValue,
  options: ResolveGridValueOptions = {},
): ResolvedGridValue {
  let currentValue =
    typeof value === 'number'
      ? normalizeGridNumber(value, typeof fallback === 'number' ? fallback : fallback.xs, options)
      : undefined;
  const result = {} as ResolvedGridValue;

  for (const breakpoint of GRID_BREAKPOINTS) {
    const fallbackValue = typeof fallback === 'number' ? fallback : fallback[breakpoint];
    if (typeof value === 'object' && value?.[breakpoint] !== undefined) {
      currentValue = normalizeGridNumber(value[breakpoint], currentValue ?? fallbackValue, options);
    }
    result[breakpoint] = currentValue ?? fallbackValue;
  }

  return result;
}

/** 解析网格容器列数与间距，columnGap/rowGap 优先于 gap。 @en Resolves grid columns and gaps, with directional gaps taking precedence over gap. */
export function resolveGridContainer(
  props: Pick<GridCommonProps, 'cols' | 'gap' | 'columnGap' | 'rowGap'>,
  defaultCols = 24,
): ResolvedGridContainer {
  const cols = resolveGridValue(props.cols, defaultCols, { integer: true, min: 1 });
  const gap = resolveGridValue(props.gap, 0, { min: 0 });
  return {
    cols,
    columnGap: resolveGridValue(props.columnGap, gap, { min: 0 }),
    rowGap: resolveGridValue(props.rowGap, gap, { min: 0 }),
  };
}

/** 按容器列数约束网格项占位与偏移。 @en Clamps a grid item's span and offset against its container columns. */
export function resolveGridItem(
  props: GridItemCommonProps,
  container: Pick<ResolvedGridContainer, 'cols'>,
): ResolvedGridItem {
  const spans = resolveGridValue(props.span, 1, { integer: true, min: 0 });
  const offsets = resolveGridValue(props.offset, 0, { integer: true, min: 0 });
  const result = {} as ResolvedGridItem;

  for (const breakpoint of GRID_BREAKPOINTS) {
    const columnCount = container.cols[breakpoint];
    const span = Math.min(spans[breakpoint], columnCount);
    const offset = Math.min(offsets[breakpoint], Math.max(0, columnCount - 1));
    result[breakpoint] = {
      visible: span !== 0,
      span: Math.max(1, Math.min(span + offset, columnCount)),
      offset,
    };
  }

  return result;
}
