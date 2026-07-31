import type { SlotsType } from 'vue';
export const useRowSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type RowSlots = typeof useRowSlots;

export const useColumnSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type ColumnSlots = typeof useColumnSlots;

export const useGridSlots = useRowSlots;
export type GridSlots = typeof useGridSlots;

export const useGridItemSlots = useColumnSlots;
export type GridItemSlots = typeof useGridItemSlots;
