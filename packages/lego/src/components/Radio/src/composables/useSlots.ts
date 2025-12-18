import type { SlotsType } from 'vue';
export const useRadioSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type RadioSlots = typeof useRadioSlots;
