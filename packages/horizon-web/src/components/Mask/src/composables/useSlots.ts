import type { SlotsType } from 'vue';
export const useMaskSlots = Object as SlotsType<{
  /**
   * 遮罩层上的内容
   */
  default?: {};
}>;
export type MaskSlots = typeof useMaskSlots;
