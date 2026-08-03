import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const GRID_BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

export type GridBreakpoint = (typeof GRID_BREAKPOINTS)[number];
export type GridResponsiveValue = Partial<Record<GridBreakpoint, number>>;
export type GridValue = number | GridResponsiveValue;
export type ResolvedGridValue = Record<GridBreakpoint, number>;

type ResolveOptions = {
  integer?: boolean;
  min?: number;
};

function normalizeValue(value: unknown, fallback: number, options: ResolveOptions) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return fallback;
  }

  const normalizedValue = options.integer ? Math.trunc(numericValue) : numericValue;
  return options.min === undefined ? normalizedValue : Math.max(options.min, normalizedValue);
}

export function resolveGridValue(
  value: GridValue | undefined,
  fallback: number | ResolvedGridValue,
  options: ResolveOptions = {},
): ResolvedGridValue {
  let currentValue =
    typeof value === 'number'
      ? normalizeValue(value, typeof fallback === 'number' ? fallback : fallback.xs, options)
      : undefined;
  const result = {} as ResolvedGridValue;

  GRID_BREAKPOINTS.forEach(breakpoint => {
    const fallbackValue = typeof fallback === 'number' ? fallback : fallback[breakpoint];
    if (typeof value === 'object' && value?.[breakpoint] !== undefined) {
      currentValue = normalizeValue(value[breakpoint], currentValue ?? fallbackValue, options);
    }
    result[breakpoint] = currentValue ?? fallbackValue;
  });

  return result;
}

export const useGridProps = declarePropType({
  /**
   * 标签
   * @en Custom element tag.
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * 每行的网格列数
   * @en Number of grid columns per row.
   */
  cols: {
    type: [Number, Object] as PropType<GridValue>,
    default: 24,
  },
  /**
   * 行列间距
   * @en Gap between rows and columns.
   */
  gap: {
    type: [Number, Object] as PropType<GridValue>,
  },
  /**
   * 列间距，优先级高于 gap
   * @en Column gap. Takes precedence over gap.
   */
  columnGap: {
    type: [Number, Object] as PropType<GridValue>,
  },
  /**
   * 行间距，优先级高于 gap
   * @en Row gap. Takes precedence over gap.
   */
  rowGap: {
    type: [Number, Object] as PropType<GridValue>,
  },
  /**
   * 网格项在单元格内的垂直对齐方式
   * @en Vertical alignment of items within their grid areas.
   */
  align: {
    type: String as PropType<'start' | 'center' | 'end' | 'stretch'>,
    default: 'stretch',
  },
  /**
   * 网格项在单元格内的水平对齐方式
   * @en Horizontal alignment of items within their grid areas.
   */
  justify: {
    type: String as PropType<'start' | 'center' | 'end' | 'stretch'>,
    default: 'stretch',
  },
});

export const useGridItemProps = declarePropType({
  /**
   * 栅格占据列数，设为 0 时隐藏
   * @en Number of occupied grid columns. Set to 0 to hide the item.
   */
  span: {
    type: [Number, Object] as PropType<GridValue>,
    default: 1,
  },
  /**
   * 栅格左侧偏移列数
   * @en Number of empty grid columns before the item.
   */
  offset: {
    type: [Number, Object] as PropType<GridValue>,
    default: 0,
  },
});

export type GridProps = ExtractPropTypes<typeof useGridProps>;
export type GridItemProps = ExtractPropTypes<typeof useGridItemProps>;
