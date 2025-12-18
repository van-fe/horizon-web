import type { SlotsType } from 'vue';
export const useScrollbarSlots = Object as SlotsType<{
  /**
   * 默认内容物
   */
  default?: {};
}>;

export type ScrollbarSlots = typeof useScrollbarSlots;
