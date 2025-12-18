import type { SlotsType } from 'vue';
export const useSwitchSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type SwitchSlots = typeof useSwitchSlots;
