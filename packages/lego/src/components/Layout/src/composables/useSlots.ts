import type { SlotsType } from 'vue';
export const useRowSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type RowSlots = typeof useRowSlots;

export const useColumnSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type ColumnSlots = typeof useColumnSlots;
