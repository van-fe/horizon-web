import type { SlotsType } from 'vue';
export const usePaginationSlots = Object as SlotsType<{
  /**
   * 分页前缀
    * @en Custom content for the prefix slot.
   */
  prefix?: {};

  /**
   * 上一页
    * @en Custom content for the prev slot.
   */
  prev?: {};

  /**
   * 下一页
    * @en Custom content for the next slot.
   */
  next?: {};

  /**
   * 分页后缀
    * @en Custom content for the suffix slot.
   */
  suffix?: {};
}>;

export type PaginationSlots = typeof usePaginationSlots;
