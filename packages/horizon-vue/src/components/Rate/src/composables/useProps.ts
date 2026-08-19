import type { ExtractPropTypes, PropType } from 'vue';
import type { RateSize, RateTooltip } from '@aurora/core';
import { isRateCount, isRateGutter, isRateSize, isRateValue, RATE_DEFAULTS } from '@aurora/core';
import { cssVariable, declarePropType } from '@aurora/utils';

export const useRateProps = declarePropType({
  /**
   * 绑定值
   * @en Configuration for model value.
   */
  modelValue: {
    type: Number,
    default: RATE_DEFAULTS.defaultValue,
    validator: isRateValue,
  },
  /**
   * icon数量
   * @en Configuration for count.
   */
  count: {
    type: Number,
    default: RATE_DEFAULTS.count,
    validator: isRateCount,
  },
  /**
   * 允许半星
   * @en Configuration for half.
   */
  half: {
    type: Boolean,
    default: RATE_DEFAULTS.half,
  },
  /**
   * 是否显示提示文字
   * @en Configuration for show tooltip.
   */
  showTooltip: {
    type: Boolean,
    default: RATE_DEFAULTS.showTooltip,
  },
  /**
   * 提示文字文本
   * @en Configuration for tooltip.
   */
  tooltip: {
    type: Array as PropType<RateTooltip[]>,
    default: () => [...RATE_DEFAULTS.tooltip],
  },
  /**
   * 是否只读
   * @en Configuration for readonly.
   */
  readonly: {
    type: Boolean,
    default: RATE_DEFAULTS.readOnly,
  },
  /**
   * 是否禁用
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: RATE_DEFAULTS.disabled,
  },
  /**
   * 图标大小
   * @en Configuration for size.
   */
  size: {
    type: [String, Number] as PropType<RateSize>,
    validator: isRateSize,
  },
  /**
   * 自定义图标种类
   * @en Configuration for icon.
   */
  icon: {
    type: String,
    default: 'star_filled',
  },
  /**
   * 自定义图标active颜色
   * @en Configuration for color.
   */
  color: {
    type: String,
    default: `rgb(${cssVariable('rate', 'color', 'content')})`,
  },
  /**
   * 图标空时的颜色
   * @en Configuration for void color.
   */
  voidColor: {
    type: String,
    default: cssVariable('border-default'),
  },
  /**
   * 图标禁用时的颜色
   * @en Configuration for disabled color.
   */
  disabledColor: {
    type: String,
    default: cssVariable('text-disabled'),
  },
  /**
   * icon间距
   * @en Configuration for gutter.
   */
  gutter: {
    type: Number,
    default: RATE_DEFAULTS.gutter,
    validator: isRateGutter,
  },
});

export type RateProps = ExtractPropTypes<typeof useRateProps>;
export type { RatePresetSize, RateSize, RateTooltip } from '@aurora/core';
