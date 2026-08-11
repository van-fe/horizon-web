import type {
  AdaptComponentApiShape,
  ComponentEventValidators,
  PaginationEventMap,
} from '@aurora/core';
import { isPaginationPage, isPaginationPageSize } from '@aurora/core';

type PaginationVueEventMap = AdaptComponentApiShape<
  PaginationEventMap,
  {
    change: 'modify';
    pageChange: 'currentChange';
    pageSizeChange: 'sizeChange';
    previous: 'clickPrevPage';
    currentPageClick: 'clickCurrentPage';
    next: 'clickNextPage';
  },
  never,
  { 'update:pageSize': [pageSize: number]; 'update:currentPage': [currentPage: number] }
>;

export const usePaginationEmits = {
  /** 更新每页数量绑定值。 @en Updates the bound page size. */
  'update:pageSize': isPaginationPageSize,
  /** 更新当前页绑定值。 @en Updates the bound current page. */
  'update:currentPage': isPaginationPage,
  /** 每页数量变化。 @en Page size changed. */
  sizeChange: isPaginationPageSize,
  /** 上一页操作完成。 @en Previous-page action completed. */
  clickPrevPage: isPaginationPage,
  /** 再次激活当前页。 @en Current page activated again. */
  clickCurrentPage: isPaginationPage,
  /** 下一页操作完成。 @en Next-page action completed. */
  clickNextPage: isPaginationPage,
  /** 跳转操作完成。 @en Jump action completed. */
  jump: isPaginationPage,
  /** 当前页变化。 @en Current page changed. */
  currentChange: isPaginationPage,
  /** 页码或每页数量变化。 @en Page or page size changed. */
  modify: (currentPage: number, pageSize: number) =>
    isPaginationPage(currentPage) && isPaginationPageSize(pageSize),
} satisfies ComponentEventValidators<PaginationVueEventMap>;

export type PaginationEmits = typeof usePaginationEmits;
