import type { DatePickerProps } from './useProps';
import { isBoolean, isObject } from '@nio-fe/shared';
import type { Ref } from 'vue';

export const useDatePickerSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 触发器
   * @param val 当前日期
   */
  reference: (val: { reference: DatePickerProps['modelValue'] }) => isObject(val),
  /**
   * 前缀
   */
  prefix: () => true,
  /**
   * 后缀
   */
  suffix: () => true,
  /**
   * 范围选择时的分隔符号
   */
  rangeSeparator: () => true,
  /**
   * 尾部
   */
  footer: (disabled: Ref<boolean>) => isBoolean(disabled.value),
};

export type DatePickerSlots = typeof useDatePickerSlots;
