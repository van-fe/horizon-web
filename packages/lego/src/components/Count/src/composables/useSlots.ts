export const useCountSlots = {
  /**
   * 前缀内容
   */
  prefix: () => true,
  /**
   * 后缀内容
   */
  suffix: () => true,
};

export type CountSlots = typeof useCountSlots;
