import type { SlotsType } from 'vue';
import type { AdaptComponentApiShape, PaginationRegionMap } from '@aurora/core';

type PaginationVueSlots = AdaptComponentApiShape<PaginationRegionMap, { previous: 'prev' }>;

export const usePaginationSlots = Object as SlotsType<{
  /** 分页前缀。 @en Content before the pagination controls. */
  prefix?: PaginationVueSlots['prefix'];
  /** 上一页内容。 @en Previous-page content. */
  prev?: PaginationVueSlots['prev'];
  /** 下一页内容。 @en Next-page content. */
  next?: PaginationVueSlots['next'];
  /** 分页后缀。 @en Content after the pagination controls. */
  suffix?: PaginationVueSlots['suffix'];
}>;

export type PaginationSlots = typeof usePaginationSlots;
