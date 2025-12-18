import { isDefined, isNil, isNumber, isObject, isString } from '@aurora/utils';
import type { NTableColumnData } from '../utils/types';
import { NTableSortOrderEnum } from '../utils/types';

export const useTableEmits = {
  /**
   * 当数据发生变化时触发
   * @param data 表格数据
   */
  'update:data': <T>(data: T[]) => Array.isArray(data),
  /**
   * 当展开行变化时触发
   * @param expanded 已展开的行
   */
  'update:expandRowKeys': <T>(expanded: T[]) => Array.isArray(expanded),
  /**
   * 选择时触发此事件
   * @param row 当前行
   */
  select: <T>(row: T) => isObject(row),
  /**
   * 反选时触发此事件
   * @param row 当前行
   */
  deselect: <T>(row: T) => isObject(row),
  /**
   * 在点击全选时触发
   * 只有在 `multiple = true` 时有效
   * @param selected 已选中的行
   */
  selectAll: <T>(selected: T[]) => Array.isArray(selected),
  /**
   * 鼠标进入单元格时触发
   * @param row 当前行
   * @param column 当前列
   * @param cell 当前单元格对象
   * @param evt 鼠标事件
   */
  cellMouseEnter: (row: any, column: NTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 鼠标离开单元格时触发
   * @param row 当前行
   * @param column 当前列
   * @param cell 当前单元格对象
   * @param evt 鼠标事件
   */
  cellMouseLeave: (row: any, column: NTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 点击单元格时触发
   * @param row 当前行
   * @param column 当前列
   * @param cell 当前单元格对象
   * @param evt 鼠标事件
   */
  cellClick: (row: any, column: NTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 双击单元格时触发
   * @param row 当前行
   * @param column 当前列
   * @param cell 当前单元格对象
   * @param evt 鼠标事件
   */
  cellDblclick: (row: any, column: NTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 右键单元格时触发
   * @param row 当前行
   * @param column 当前列
   * @param cell 当前单元格对象
   * @param evt 鼠标事件
   */
  cellContextmenu: (row: any, column: NTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 行点击时触发
   * @param row 当前行
   * @param evt 鼠标事件
   */
  rowClick: (row: any, evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 行双击时触发
   * @param row 当前行
   * @param evt 鼠标事件
   */
  rowDblclick: (row: any, evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 行右键时触发
   * @param row 当前行
   * @param evt 鼠标事件
   */
  rowContextmenu: (row: any, evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 当排序发生改变时触发
   * @param status 状态，以数组形式给予 \n column: 当前列; \n order 当前排序状态
   */
  sortChange: (status: Array<{ column: NTableColumnData; order: NTableSortOrderEnum }>) =>
    Array.isArray(status),
  /**
   * 当拖动表头结束时，且宽度发生了改变时触发
   * @param newWidth 新的宽度
   * @param oldWidth 原本宽度
   * @param column 当前列
   * @param event 鼠标事件
   */
  headerDragend: (newWidth: number, oldWidth: number, column: any, event: MouseEvent) =>
    isNumber(newWidth) && isNumber(oldWidth) && event instanceof MouseEvent,
  /**
   * 滚动到顶部时触发
   */
  scrollTop: () => true,
  /**
   * 滚动到底部时触发
   */
  scrollBottom: () => true,
};

export const useTableColumnEmits = {
  /**
   * 当选中变化时触发
   * @param selected 已选择的行，如果 `multiple = true` 则是数组，反之是对象或 `undefined`
   */
  'update:selectedKeys': <T>(selected: T[] | T | undefined) =>
    Array.isArray(selected) ||
    isString(selected) ||
    isNumber(selected) ||
    isObject(selected) ||
    isNil(selected),
  /**
   * 当过滤发生改变时触发
   * @param value
   */
  filterChange: (value: any) => isDefined(value) || isNil(value),
  /**
   * 当排序发生改变时触发
   * @param order 排序结果，为 null 时即取消排序
   */
  sortChange: (order: NTableSortOrderEnum | null) =>
    isNil(order) || [NTableSortOrderEnum.DESC, NTableSortOrderEnum.ASC].includes(order),
};

export type TableEmits = typeof useTableEmits;
export type TableColumnEmits = typeof useTableColumnEmits;
