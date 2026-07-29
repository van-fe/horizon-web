import type { SlotsType } from 'vue';
export const useDividerSlots = Object as SlotsType<{
  /**
   * 分割线内的文字
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type DividerSlots = typeof useDividerSlots;
