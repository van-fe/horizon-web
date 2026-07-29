import type { SlotsType } from 'vue';
export const useScrollbarSlots = Object as SlotsType<{
  /**
   * 默认内容物
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type ScrollbarSlots = typeof useScrollbarSlots;
