import { isNumber } from '@aurora/utils';

export const usePaginationEmits = {
  /**
   * 每页显示个数更新事件，可以使用 `v-model:pageSize` 做双向绑定
   * @param pageSize 分页大小
   * @paramEn pageSize The page size value.
    * @en Emitted when update:page size changes.
   */
  'update:pageSize': (pageSize: number) => isNumber(pageSize),
  /**
   * 当前页数更新事件，可以使用 `v-model:currentPage` 做双向绑定
   * @param currentPage 当前页数
   * @paramEn currentPage The current page value.
    * @en Emitted when update:current page changes.
   */
  'update:currentPage': (currentPage: number) => isNumber(currentPage),
  /**
   * 改变每页显示个数
   * @param pageSize 分页大小
   * @paramEn pageSize The page size value.
   * @deprecated sizeChange
    * @en Emitted when change size changes.
   */
  changeSize: (pageSize: number) => isNumber(pageSize),
  /**
   * 改变每页显示个数
   * @param pageSize 分页大小
   * @paramEn pageSize The page size value.
    * @en Emitted when size change changes.
   */
  sizeChange: (pageSize: number) => isNumber(pageSize),
  /**
   * 上一页
   * @param currentPage 当前页数
   * @paramEn currentPage The current page value.
    * @en Emitted when click prev page changes.
   */
  clickPrevPage: (currentPage: number) => isNumber(currentPage),
  /**
   * 点击当前页
   * @param currentPage 当前页数
   * @paramEn currentPage The current page value.
    * @en Emitted when click current page changes.
   */
  clickCurrentPage: (currentPage: number) => isNumber(currentPage),
  /**
   * 下一页
   * @param currentPage 当前页数
   * @paramEn currentPage The current page value.
    * @en Emitted when click next page changes.
   */
  clickNextPage: (currentPage: number) => isNumber(currentPage),
  /**
   * 跳转页
   * @param currentPage 当前页数
   * @paramEn currentPage The current page value.
    * @en Emitted when jump changes.
   */
  jump: (currentPage: number) => isNumber(currentPage),
  /**
   * 当前页码改变时触发
   * @param currentPage 当前页数
   * @paramEn currentPage The current page value.
   * @deprecated currentChange
    * @en Emitted when change changes.
   */
  change: (currentPage: number) => isNumber(currentPage),
  /**
   * 当前页码改变时触发
   * @param currentPage 当前页数
   * @paramEn currentPage The current page value.
    * @en Emitted when current change changes.
   */
  currentChange: (currentPage: number) => isNumber(currentPage),
  /**
   * 当 `current-page` 或 `page-size` 改变时触发
   * @param currentPage 当前页数
   * @paramEn currentPage The current page value.
   * @param pageSize 分页大小
   * @paramEn pageSize The page size value.
    * @en Emitted when modify changes.
   */
  modify: (currentPage: number, pageSize: number) => isNumber(currentPage) && isNumber(pageSize),
};

export type PaginationEmits = typeof usePaginationEmits;
