import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';

type Color = { color: string; percentage: number };
type ProgressFn = (percentage: number) => string;

export const useProgressProps = declarePropType({
  /**
   * 进度条类型
   */
  type: {
    type: String,
    default: 'line',
    values: ['line', 'circle', 'dashboard'],
  },
  /**
   * 百分比
   */
  percentage: {
    type: Number,
    default: 0,
    required: true,
    validator: (val: number): boolean => val >= 0 && val <= 100,
  },
  /**
   * 进度条当前状态
   * @version 2.0.0-beta.7 新增 `error`，与 `exception` 相同
   */
  status: {
    type: String as PropType<'success' | 'exception' | 'error' | 'warning'>,
    default: '',
  },
  /**
   * 控制动画进度条速度
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
   */
  size: {
    type: String as PropType<'mini' | 'small' | 'medium' | 'large'>,
  },
  /**
   * 指定进度条文字内容
   */
  format: {
    type: Function as PropType<ProgressFn>,
    default: (percentage: number): string => `${percentage}%`,
  },
  /**
   * 自定义文本内容
   */
  content: {
    type: [String, Number, Boolean],
    default: '',
  },
  /**
   * 自定义文本的显示位置，type为line时可用
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
   */
  textBold: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示进度条文字内容
   */
  showText: {
    type: Boolean,
    default: true,
  },
  /**
   * 进度条背景色 进度条背景色 （会覆盖 status 状态颜色）
   */
  color: {
    type: [String, Array, Function] as PropType<string | Color[] | ProgressFn>,
    default: '',
  },
});

export type ProgressProps = ExtractPropTypes<typeof useProgressProps>;
