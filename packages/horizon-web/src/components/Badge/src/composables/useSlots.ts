import type { SlotsType } from 'vue';
export const useBadgeSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type BadgeSlots = typeof useBadgeSlots;
