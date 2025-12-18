import type { Ref, SlotsType } from 'vue';
import type { DatePickerProps } from './useProps';

export const useDatePickerSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {},
  /**
   * 触发器
   * @param val 当前日期
   */
  reference: { reference: DatePickerProps['modelValue'] },
  /**
   * 前缀
   */
  prefix?: {},
  /**
   * 后缀
   */
  suffix?: {},
  /**
   * 范围选择时的分隔符号
   */
  rangeSeparator?: {},
  /**
   * 尾部
   */
  footer?: Ref<boolean>,
}>

export type DatePickerSlots = typeof useDatePickerSlots;
