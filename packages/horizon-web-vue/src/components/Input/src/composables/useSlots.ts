import type { SlotsType } from 'vue';
export const useInputSlots = Object as SlotsType<{
  /**
   * 输入框头部内容
    * @en Custom content for the prefix slot.
   */
  prefix?: {};
  /**
   * 输入框尾部内容
    * @en Custom content for the suffix slot.
   */
  suffix?: {};
  /**
   * 输入框前置内容
    * @en Custom content for the prepend slot.
   */
  prepend?: {};
  /**
   * 输入框后置内容
    * @en Custom content for the append slot.
   */
  append?: {};
}>;

export type InputSlots = typeof useInputSlots;
