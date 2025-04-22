export const useEmptySlots = {
  /**
   * 自定义底部内容
   */
  default: () => true,
  /**
   * 自定义图片
   */
  image: () => true,
  /**
   * 自定义描述
   */
  description: () => true,
};

export type EmptySlots = typeof useEmptySlots;
