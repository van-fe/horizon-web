import type { ExtractPropTypes, PropType } from 'vue';
import type {
  DividerDirection,
  DividerLineStyle,
  DividerTitlePlacement,
  DividerVariant,
} from '@aurora/core';
import {
  DIVIDER_DEFAULTS,
  isDividerDirection,
  isDividerLineStyle,
  isDividerTitlePlacement,
  isDividerVariant,
} from '@aurora/core';
import { declarePropType, cssVariable } from '@aurora/utils';

export const useDividerProps = declarePropType({
  /**
   * 分割线类型
   * `primary` 与 `default` 相同
   * `secondary` 与 `strong` 相同
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<DividerVariant>,
    default: DIVIDER_DEFAULTS.variant,
    validator: isDividerVariant,
  },
  /**
   * 分割线方向
   * 在插入文字时，`vertical` 值会被忽视
   * @en Configuration for direction.
   */
  direction: {
    type: String as PropType<DividerDirection>,
    default: DIVIDER_DEFAULTS.direction,
    validator: isDividerDirection,
  },
  /**
   * 线的类型
   * @en Configuration for line style.
   */
  lineStyle: {
    type: String as PropType<DividerLineStyle>,
    default: DIVIDER_DEFAULTS.lineStyle,
    validator: isDividerLineStyle,
  },
  /**
   * 标题位置
   * @en Configuration for title placement.
   */
  titlePlacement: {
    type: String as PropType<DividerTitlePlacement>,
    default: DIVIDER_DEFAULTS.titlePlacement,
    validator: isDividerTitlePlacement,
  },
  /**
   * 上下间距
   * @en Configuration for vertical margin.
   */
  verticalMargin: {
    type: [String, Number],
    default: cssVariable('divider', 'spacing', 'vertical', 'margin'),
  },
  /**
   * 左右间距
   * @en Configuration for horizontal margin.
   */
  horizontalMargin: {
    type: [String, Number],
    default: cssVariable('divider', 'spacing', 'horizontal', 'margin'),
  },
});

export type DividerProps = ExtractPropTypes<typeof useDividerProps>;
