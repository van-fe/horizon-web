import type { ExtractPropTypes } from 'vue';
import { COUNT_DEFAULTS, isCountDecimal, isCountDelay, isCountExtent } from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export const useCountProps = declarePropType({
  /**
   * 开始值
   * @en Configuration for start value.
   */
  startValue: {
    type: Number,
    required: false,
    default: COUNT_DEFAULTS.startValue,
  },
  /**
   * 结束值
   * @en Configuration for end value.
   */
  endValue: {
    type: Number,
    required: true,
    default: COUNT_DEFAULTS.endValue,
  },
  /**
   * 小数位数
   * @en Configuration for decimal.
   */
  decimal: {
    type: Number,
    required: false,
    default: COUNT_DEFAULTS.decimal,
    validator: isCountDecimal,
  },
  /**
   * 递增步长(10的幂指数)
   * @en Configuration for step.
   */
  step: {
    type: Number,
    required: false,
    default: COUNT_DEFAULTS.step,
  },
  /**
   * 自动播放
   * @en Configuration for auto play.
   */
  autoPlay: {
    type: Boolean,
    required: false,
    default: COUNT_DEFAULTS.autoPlay,
  },
  /**
   * setTimeout每次延迟的毫秒数(>=4)
   * @en Configuration for delay.
   */
  delay: {
    type: Number,
    required: false,
    default: COUNT_DEFAULTS.delay,
    validator: isCountDelay,
  },
  /**
   * 分隔符
   * @en Configuration for separator.
   */
  separator: {
    type: String,
    required: false,
    default: COUNT_DEFAULTS.separator,
  },
  /**
   * 分隔长度
   * @en Configuration for extent.
   */
  extent: {
    type: Number,
    required: false,
    default: COUNT_DEFAULTS.extent,
    validator: isCountExtent,
  },
  /**
   * 前缀
   * @en Configuration for prefix.
   */
  prefix: {
    type: String,
    required: false,
  },
  /**
   * 后缀
   * @en Configuration for suffix.
   */
  suffix: {
    type: String,
    required: false,
  },
});

export type CountProps = ExtractPropTypes<typeof useCountProps>;
