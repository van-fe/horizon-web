export const usePaginationSlots = {
  /**
   * 分页前缀
   */
  prefix: () => true,

  /**
   * 上一页
   */
  prev: () => true,

  /**
   * 下一页
   */
  next: () => true,

  /**
   * 分页后缀
   */
  suffix: () => true,
};

export type PaginationSlots = typeof usePaginationSlots;
