export const useSpaceSlots = {};

export type SpaceSlots = typeof useSpaceSlots;

export const useSpaceItemSlots = {
  /**
   * 默认插槽
   */
  default: () => true,

  /**
   * 自定义分隔符
   * @version 2.12.11
   */
  separator: () => true,
};

export type SpaceItemSlots = typeof useSpaceItemSlots;
