import type { ExtractPropTypes, PropType } from 'vue';
import type {
  ProgressColor,
  ProgressFormatter,
  ProgressPlacement,
  ProgressSize,
  ProgressStatus,
  ProgressType,
} from '@aurora/core';
import {
  isProgressPercentage,
  isProgressPlacement,
  isProgressSize,
  isProgressStatus,
  isProgressType,
  PROGRESS_DEFAULTS,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export const useProgressProps = declarePropType({
  /**
   * 进度条类型
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<ProgressType>,
    default: PROGRESS_DEFAULTS.type,
    values: ['line', 'circle', 'dashboard'],
    validator: isProgressType,
  },
  /**
   * 百分比
   * @en Configuration for percentage.
   */
  percentage: {
    type: Number,
    default: 0,
    required: true,
    validator: isProgressPercentage,
  },
  /**
   * 进度条当前状态
   * @en Configuration for status.
   */
  status: {
    type: String as PropType<ProgressStatus>,
    default: PROGRESS_DEFAULTS.status,
    validator: isProgressStatus,
  },
  /**
   * 控制动画进度条速度
   * @en Configuration for duration.
   */
  duration: {
    type: Number,
    default: PROGRESS_DEFAULTS.duration,
  },
  // strokeWidth: {
  //   type: Number,
  //   default: 6,
  // },
  /**
   * 进度条的大小，四个类型可选
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<ProgressSize>,
    validator: isProgressSize,
  },
  /**
   * 指定进度条文字内容
   * @en Configuration for format.
   */
  format: {
    type: Function as PropType<ProgressFormatter>,
    default: PROGRESS_DEFAULTS.format,
  },
  /**
   * 自定义文本内容
   * @en Configuration for content.
   */
  content: {
    type: [String, Number, Boolean],
    default: PROGRESS_DEFAULTS.content,
  },
  /**
   * 自定义文本的显示位置，type为line时可用
   * @en Configuration for placement.
   */
  placement: {
    type: String as PropType<ProgressPlacement>,
    default: PROGRESS_DEFAULTS.placement,
    validator: isProgressPlacement,
  },
  // width: {
  //   type: Number,
  //   default: 126,
  // },
  /**
   * 文本内容是否加粗
   * @en Configuration for text bold.
   */
  textBold: {
    type: Boolean,
    default: PROGRESS_DEFAULTS.textBold,
  },
  /**
   * 是否显示进度条文字内容
   * @en Configuration for show text.
   */
  showText: {
    type: Boolean,
    default: PROGRESS_DEFAULTS.showText,
  },
  /**
   * 进度条背景色 进度条背景色 （会覆盖 status 状态颜色）
   * @en Configuration for color.
   */
  color: {
    type: [String, Array, Function] as PropType<ProgressColor>,
    default: PROGRESS_DEFAULTS.color,
  },
});

export type ProgressProps = ExtractPropTypes<typeof useProgressProps>;
