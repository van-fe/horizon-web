export const useLinkSlots = {
  /**
   * 默认展示内容
   */
  default: () => true,
  /**
   * 前缀
   */
  prefix: () => true,
  /**
   * 后缀
   */
  suffix: () => true,
};

export type LinkSlots = typeof useLinkSlots;
