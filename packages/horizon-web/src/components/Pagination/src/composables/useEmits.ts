import { isNumber } from '@aurora/utils';

export const usePaginationEmits = {
  /**
   * 每页显示个数更新事件，可以使用 `v-model:pageSize` 做双向绑定
   * @param pageSize 分页大小
   */
  'update:pageSize': (pageSize: number) => isNumber(pageSize),
  /**
   * 当前页数更新事件，可以使用 `v-model:currentPage` 做双向绑定
   * @param currentPage 当前页数
   */
  'update:currentPage': (currentPage: number) => isNumber(currentPage),
  /**
   * 改变每页显示个数
   * @param pageSize 分页大小
   * @deprecated sizeChange
   */
  changeSize: (pageSize: number) => isNumber(pageSize),
  /**
   * 改变每页显示个数
   * @param pageSize 分页大小
   * @version 2.5.0
   */
  sizeChange: (pageSize: number) => isNumber(pageSize),
  /**
   * 上一页
   * @param currentPage 当前页数
   */
  clickPrevPage: (currentPage: number) => isNumber(currentPage),
  /**
   * 点击当前页
   * @param currentPage 当前页数
   */
  clickCurrentPage: (currentPage: number) => isNumber(currentPage),
  /**
   * 下一页
   * @param currentPage 当前页数
   */
  clickNextPage: (currentPage: number) => isNumber(currentPage),
  /**
   * 跳转页
   * @param currentPage 当前页数
   */
  jump: (currentPage: number) => isNumber(currentPage),
  /**
   * 当前页码改变时触发
   * @param currentPage 当前页数
   * @deprecated currentChange
   */
  change: (currentPage: number) => isNumber(currentPage),
  /**
   * 当前页码改变时触发
   * @param currentPage 当前页数
   * @version 2.5.0
   */
  currentChange: (currentPage: number) => isNumber(currentPage),
  /**
   * 当 `current-page` 或 `page-size` 改变时触发
   * @param currentPage 当前页数
   * @param pageSize 分页大小
   * @version 2.5.0
   */
  modify: (currentPage: number, pageSize: number) => isNumber(currentPage) && isNumber(pageSize),
};

export type PaginationEmits = typeof usePaginationEmits;
