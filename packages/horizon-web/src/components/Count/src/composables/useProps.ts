import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@aurora/shared';

export const useCountProps = declarePropType({
  /**
   * 开始值
   */
  startValue: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * 结束值
   */
  endValue: {
    type: Number,
    required: true,
    default: 0,
  },
  /**
   * 小数位数
   */
  decimal: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * 递增步长(10的幂指数)
   */
  step: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * 自动播放
   */
  autoPlay: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * setTimeout每次延迟的毫秒数(>=4)
   */
  delay: {
    type: Number,
    required: false,
    default: 300,
  },
  /**
   * 分隔符
   */
  separator: {
    type: String,
    required: false,
    default: ',',
  },
  /**
   * 分隔长度
   */
  extent: {
    type: Number,
    required: false,
    default: 3,
  },
  /**
   * 前缀
   */
  prefix: {
    type: String,
    required: false,
  },
  /**
   * 后缀
   */
  suffix: {
    type: String,
    required: false,
  },
});

export type CountProps = ExtractPropTypes<typeof useCountProps>;
