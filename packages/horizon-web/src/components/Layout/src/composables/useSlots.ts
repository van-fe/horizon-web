import type { SlotsType } from 'vue';
export const useGridSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type GridSlots = typeof useGridSlots;

export const useGridItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type GridItemSlots = typeof useGridItemSlots;
