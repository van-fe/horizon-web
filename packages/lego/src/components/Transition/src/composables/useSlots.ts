import type { SlotsType } from 'vue';
export const useTransitionSlots = Object as SlotsType<{
  /**
   * 默认渲染内容
   */
  default?: {};
}>;

export type TransitionSlots = typeof useTransitionSlots;
