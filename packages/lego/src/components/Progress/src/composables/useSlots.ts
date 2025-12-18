import type { SlotsType } from 'vue';
export const useProgressSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type ProgressSlots = typeof useProgressSlots;
