import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

type Color = { color: string; percentage: number };
type ProgressFn = (percentage: number) => string;

export const useProgressProps = declarePropType({
  /**
   * 进度条类型
    * @en Configuration for type.
   */
  type: {
    type: String,
    default: 'line',
    values: ['line', 'circle', 'dashboard'],
  },
  /**
   * 百分比
    * @en Configuration for percentage.
   */
  percentage: {
    type: Number,
    default: 0,
    required: true,
    validator: (val: number): boolean => val >= 0 && val <= 100,
  },
  /**
   * 进度条当前状态
    * @en Configuration for status.
   */
  status: {
    type: String as PropType<'success' | 'exception' | 'error' | 'warning'>,
    default: '',
  },
  /**
   * 控制动画进度条速度
    * @en Configuration for duration.
   */
  duration: {
    type: Number,
    default: 3,
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
    type: String as PropType<'mini' | 'small' | 'medium' | 'large'>,
  },
  /**
   * 指定进度条文字内容
    * @en Configuration for format.
   */
  format: {
    type: Function as PropType<ProgressFn>,
    default: (percentage: number): string => `${percentage}%`,
  },
  /**
   * 自定义文本内容
    * @en Configuration for content.
   */
  content: {
    type: [String, Number, Boolean],
    default: '',
  },
  /**
   * 自定义文本的显示位置，type为line时可用
    * @en Configuration for placement.
   */
  placement: {
    type: String,
    default: '',
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
    default: false,
  },
  /**
   * 是否显示进度条文字内容
    * @en Configuration for show text.
   */
  showText: {
    type: Boolean,
    default: true,
  },
  /**
   * 进度条背景色 进度条背景色 （会覆盖 status 状态颜色）
    * @en Configuration for color.
   */
  color: {
    type: [String, Array, Function] as PropType<string | Color[] | ProgressFn>,
    default: '',
  },
});

export type ProgressProps = ExtractPropTypes<typeof useProgressProps>;
