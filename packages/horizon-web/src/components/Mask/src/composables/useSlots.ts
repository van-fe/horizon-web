import type { SlotsType } from 'vue';
export const useMaskSlots = Object as SlotsType<{
  /**
   * 遮罩层上的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;
export type MaskSlots = typeof useMaskSlots;
