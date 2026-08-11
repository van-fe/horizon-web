import type { SlotsType } from 'vue';
export const useSpaceSlots = Object as SlotsType<{
  /**
   * 默认插槽
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 自定义分隔符
    * @en Custom content for the separator slot.
   */
  separator?: {};
}>;

export type SpaceSlots = typeof useSpaceSlots;

export const useSpaceItemSlots = Object as SlotsType<{
  /**
   * 默认插槽
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type SpaceItemSlots = typeof useSpaceItemSlots;
