import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export const useSplitterProps = declarePropType({
  /**
   * 各面板尺寸百分比
   * @en Controlled panel sizes as percentages.
   */
  modelValue: {
    type: Array as PropType<number[]>,
  },
  /**
   * 布局方向
   * @en Layout direction.
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    values: ['horizontal', 'vertical'],
  },
  /**
   * 键盘每次调整的百分比步长
   * @en Percentage step used for keyboard resizing.
   */
  keyboardStep: {
    type: Number,
    default: 2,
    validator: (value: number) => value > 0 && value <= 100,
  },
  /**
   * 是否禁用尺寸调整
   * @en Whether resizing is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

export const useSplitterPanelProps = declarePropType({
  /**
   * 初始尺寸百分比
   * @en Initial size as a percentage.
   */
  size: {
    type: Number,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  /**
   * 最小尺寸百分比
   * @en Minimum size as a percentage.
   */
  min: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  /**
   * 最大尺寸百分比
   * @en Maximum size as a percentage.
   */
  max: {
    type: Number,
    default: 100,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  /**
   * 是否允许双击相邻分隔条折叠该面板
   * @en Whether an adjacent separator can collapse this panel on double click.
   */
  collapsible: {
    type: Boolean,
    default: false,
  },
});

export type SplitterProps = ExtractPropTypes<typeof useSplitterProps>;
export type SplitterPanelProps = ExtractPropTypes<typeof useSplitterPanelProps>;
