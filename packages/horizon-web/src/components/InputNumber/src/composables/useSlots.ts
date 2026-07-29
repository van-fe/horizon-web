import type { SlotsType } from 'vue';
export const useInputNumberSlots = Object as SlotsType<{
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
   * 前部增加插槽
    * @en Custom content for the prepend slot.
   */
  prepend?: {};
  /**
   * 后部增加插槽
    * @en Custom content for the append slot.
   */
  append?: {};
}>;

export type InputNumberSlots = typeof useInputNumberSlots;
