import type { ExtractPropTypes, PropType } from 'vue';
import type {
  ComponentRendererPropDefinitions,
  GridAlignment,
  GridCommonProps,
  GridItemCommonProps,
  GridValue,
} from '@aurora/core';
import { GRID_DEFAULTS, GRID_ITEM_DEFAULTS, isGridAlignment, isGridValue } from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export type {
  GridBreakpoint,
  GridResponsiveValue,
  GridValue,
  ResolvedGridValue,
} from '@aurora/core';
export { GRID_BREAKPOINTS, resolveGridValue } from '@aurora/core';

export const useGridProps = declarePropType({
  /**
   * 标签
   * @en Custom element tag.
   */
  tag: {
    type: String,
    default: GRID_DEFAULTS.tag,
  },
  /**
   * 每行的网格列数
   * @en Number of grid columns per row.
   */
  cols: {
    type: [Number, Object] as PropType<GridValue>,
    default: GRID_DEFAULTS.cols,
    validator: isGridValue,
  },
  /**
   * 行列间距
   * @en Gap between rows and columns.
   */
  gap: {
    type: [Number, Object] as PropType<GridValue>,
    validator: isGridValue,
  },
  /**
   * 列间距，优先级高于 gap
   * @en Column gap. Takes precedence over gap.
   */
  columnGap: {
    type: [Number, Object] as PropType<GridValue>,
    validator: isGridValue,
  },
  /**
   * 行间距，优先级高于 gap
   * @en Row gap. Takes precedence over gap.
   */
  rowGap: {
    type: [Number, Object] as PropType<GridValue>,
    validator: isGridValue,
  },
  /**
   * 网格项在单元格内的垂直对齐方式
   * @en Vertical alignment of items within their grid areas.
   */
  align: {
    type: String as PropType<GridAlignment>,
    default: GRID_DEFAULTS.align,
    validator: isGridAlignment,
  },
  /**
   * 网格项在单元格内的水平对齐方式
   * @en Horizontal alignment of items within their grid areas.
   */
  justify: {
    type: String as PropType<GridAlignment>,
    default: GRID_DEFAULTS.justify,
    validator: isGridAlignment,
  },
} satisfies ComponentRendererPropDefinitions<GridCommonProps>);

export const useGridItemProps = declarePropType({
  /**
   * 栅格占据列数，设为 0 时隐藏
   * @en Number of occupied grid columns. Set to 0 to hide the item.
   */
  span: {
    type: [Number, Object] as PropType<GridValue>,
    default: GRID_ITEM_DEFAULTS.span,
    validator: isGridValue,
  },
  /**
   * 栅格左侧偏移列数
   * @en Number of empty grid columns before the item.
   */
  offset: {
    type: [Number, Object] as PropType<GridValue>,
    default: GRID_ITEM_DEFAULTS.offset,
    validator: isGridValue,
  },
} satisfies ComponentRendererPropDefinitions<GridItemCommonProps>);

export type GridProps = ExtractPropTypes<typeof useGridProps>;
export type GridItemProps = ExtractPropTypes<typeof useGridItemProps>;
