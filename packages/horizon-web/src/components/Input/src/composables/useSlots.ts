import type { SlotsType } from 'vue';
export const useInputSlots = Object as SlotsType<{
  /**
   * 输入框头部内容
   */
  prefix?: {};
  /**
   * 输入框尾部内容
   */
  suffix?: {};
  /**
   * 输入框前置内容
   */
  prepend?: {};
  /**
   * 输入框后置内容
   */
  append?: {};
}>;

export type InputSlots = typeof useInputSlots;
