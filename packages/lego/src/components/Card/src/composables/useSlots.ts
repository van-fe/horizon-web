export const useCardSlots = {
  /**
   * 卡片内容
   */
  default: () => true,
  /**
   * 顶部内容
   */
  header: () => true,
  /**
   * 底部内容
   */
  footer: () => true,
};

export type CardSlots = typeof useCardSlots;
