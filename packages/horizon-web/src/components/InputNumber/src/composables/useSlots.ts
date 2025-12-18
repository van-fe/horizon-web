import type { SlotsType } from 'vue';
export const useInputNumberSlots = Object as SlotsType<{
  /**
   * 输入框头部内容
   */
  prefix?: {};
  /**
   * 输入框尾部内容
   */
  suffix?: {};
  /**
   * 前部增加插槽
   * @version 2.0.0-beta.6
   */
  prepend?: {};
  /**
   * 后部增加插槽
   * @version 2.0.0-beta.6
   */
  append?: {};
}>;

export type InputNumberSlots = typeof useInputNumberSlots;
