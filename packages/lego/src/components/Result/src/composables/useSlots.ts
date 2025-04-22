export const useResultSlots = {
  /**
   * 自定义图标
   */
  icon: () => true,
  /**
   * 自定义标题
   */
  title: () => true,
  /**
   * 自定义二级标题
   */
  subtitle: () => true,
  /**
   * 自定义底部额外区域
   */
  extra: () => true,
};

export type ResultSlots = typeof useResultSlots;
