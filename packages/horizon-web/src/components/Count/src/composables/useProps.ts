import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useCountProps = declarePropType({
  /**
   * 开始值
    * @en Configuration for start value.
   */
  startValue: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * 结束值
    * @en Configuration for end value.
   */
  endValue: {
    type: Number,
    required: true,
    default: 0,
  },
  /**
   * 小数位数
    * @en Configuration for decimal.
   */
  decimal: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * 递增步长(10的幂指数)
    * @en Configuration for step.
   */
  step: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * 自动播放
    * @en Configuration for auto play.
   */
  autoPlay: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * setTimeout每次延迟的毫秒数(>=4)
    * @en Configuration for delay.
   */
  delay: {
    type: Number,
    required: false,
    default: 300,
  },
  /**
   * 分隔符
    * @en Configuration for separator.
   */
  separator: {
    type: String,
    required: false,
    default: ',',
  },
  /**
   * 分隔长度
    * @en Configuration for extent.
   */
  extent: {
    type: Number,
    required: false,
    default: 3,
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
