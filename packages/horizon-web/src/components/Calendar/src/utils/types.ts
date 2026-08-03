import type { VNode } from 'vue';
import type { Dayjs } from 'dayjs';

export interface HCalendarPinFlag {
  /**
   * 唯一识别 ID
   * @invisible
   */
  _uuid?: string;
  /**
   * 显示标题
   */
  title?: string | VNode;
  /**
   * 类型，将会影响颜色
   * @default 'default'
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'pill';
  /**
   * 开始日期时间
   */
  startAt: Date | string | Dayjs;
  /**
   * 内置变量
   * @invisible
   */
  _startAt?: Dayjs;
  /**
   * 结束日期时间
   * 为空则默认认为持续到开始日期时间当天结束
   */
  endAt?: Date | string | Dayjs;
  /**
   * 内置变量
   * @invisible
   */
  _endAt?: Dayjs;
  /**
   * 是否允许点击
   * @default false
   */
  clickable?: boolean;
  /**
   * 文字提示
   * 如果设置为 `true`，则会自动将 `flag` 内部展示的文字作为展示内容
   */
  tooltip?: string | boolean;
  /**
   * 自定义横幅字体颜色和开始标志的颜色
   */
  color?: string;
  /**
   * 自定义横幅背景色
   */
  background?: string;
  /**
   * 是否显示时间，会覆盖 `props.pingFlagsShowTime`
   * 如果跨天则会结合日期显示
   * @default false
   */
  showTime?: boolean;
  /**
   * 其他自定义字段
   */
  [index: string]: unknown;
}
