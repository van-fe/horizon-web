import type { SlotsType } from 'vue';
export const useTransitionSlots = Object as SlotsType<{
  /**
   * 默认渲染内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type TransitionSlots = typeof useTransitionSlots;
