import type { SlotsType } from 'vue';
export const useSpaceSlots = Object as SlotsType<{
  /**
   * 默认插槽
   */
  default?: {};
  /**
   * 自定义分隔符
   * @version 2.12.11
   */
  separator?: {};
}>;

export type SpaceSlots = typeof useSpaceSlots;

export const useSpaceItemSlots = Object as SlotsType<{
  /**
   * 默认插槽
   */
  default?: {};
}>;

export type SpaceItemSlots = typeof useSpaceItemSlots;
