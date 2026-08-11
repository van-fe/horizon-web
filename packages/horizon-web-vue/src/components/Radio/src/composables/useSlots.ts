import type { SlotsType } from 'vue';
export const useRadioSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type RadioSlots = typeof useRadioSlots;
