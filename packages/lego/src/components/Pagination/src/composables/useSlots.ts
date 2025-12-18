import type { SlotsType } from 'vue';
export const usePaginationSlots = Object as SlotsType<{
  /**
   * 分页前缀
   */
  prefix?: {};

  /**
   * 上一页
   */
  prev?: {};

  /**
   * 下一页
   */
  next?: {};

  /**
   * 分页后缀
   */
  suffix?: {};
}>;

export type PaginationSlots = typeof usePaginationSlots;
