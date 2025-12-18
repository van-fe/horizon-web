import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType, cssVariable } from '@aurora/shared';

export const useDividerProps = declarePropType({
  /**
   * 分割线类型
   * `primary` 与 `default` 相同
   * `secondary` 与 `strong` 相同
   */
  type: {
    type: String as PropType<'default' | 'strong' | 'primary' | 'secondary'>,
    default: 'default',
  },
  /**
   * 分割线方向
   * 在插入文字时，`vertical` 值会被忽视
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  /**
   * 线的类型
   * @version 2.0.0-beta.4
   */
  lineStyle: {
    type: String as PropType<'solid' | 'dashed' | 'dotted'>,
    default: 'solid',
  },
  /**
   * 标题位置
   */
  titlePlacement: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
  /**
   * 上下间距
   * @version 2.3.0
   */
  verticalMargin: {
    type: [String, Number],
    default: cssVariable('divider-margin--vertical'),
  },
  /**
   * 左右间距
   * @version 2.3.0
   */
  horizontalMargin: {
    type: [String, Number],
    default: cssVariable('divider-margin--horizontal'),
  },
});

export type DividerProps = ExtractPropTypes<typeof useDividerProps>;
