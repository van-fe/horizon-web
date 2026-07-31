import { isDefined, isNil, isNumber, isObject, isString } from '@aurora/utils';
import type {
  HTableCellEditContext,
  HTableColumnData,
  HTableQuery,
  HTableState,
} from '../utils/types';
import { HTableSortOrderEnum } from '../utils/types';

export const useTableEmits = {
  /**
   * 当数据发生变化时触发
   * @param data 表格数据
   * @paramEn data The data value.
   * @en Emitted when update:data changes.
   */
  'update:data': <T>(data: T[]) => Array.isArray(data),
  /**
   * 当展开行变化时触发
   * @param expanded 已展开的行
   * @paramEn expanded The expanded value.
   * @en Emitted when update:expand row keys changes.
   */
  'update:expandRowKeys': <T>(expanded: T[]) => Array.isArray(expanded),
  /**
   * 选择时触发此事件
   * @param row 当前行
   * @paramEn row The row value.
   * @en Emitted when select changes.
   */
  select: <T>(row: T) => isObject(row),
  /**
   * 反选时触发此事件
   * @param row 当前行
   * @paramEn row The row value.
   * @en Emitted when deselect changes.
   */
  deselect: <T>(row: T) => isObject(row),
  /**
   * 在点击全选时触发
   * 只有在 `multiple = true` 时有效
   * @param selected 已选中的行
   * @paramEn selected The selected value.
   * @en Emitted when select all changes.
   */
  selectAll: <T>(selected: T[]) => Array.isArray(selected),
  /**
   * 鼠标进入单元格时触发
   * @param row 当前行
   * @paramEn row The row value.
   * @param column 当前列
   * @paramEn column The column value.
   * @param cell 当前单元格对象
   * @paramEn cell The cell value.
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
   * @en Emitted when cell mouse enter changes.
   */
  cellMouseEnter: (row: any, column: HTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 鼠标离开单元格时触发
   * @param row 当前行
   * @paramEn row The row value.
   * @param column 当前列
   * @paramEn column The column value.
   * @param cell 当前单元格对象
   * @paramEn cell The cell value.
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
   * @en Emitted when cell mouse leave changes.
   */
  cellMouseLeave: (row: any, column: HTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 点击单元格时触发
   * @param row 当前行
   * @paramEn row The row value.
   * @param column 当前列
   * @paramEn column The column value.
   * @param cell 当前单元格对象
   * @paramEn cell The cell value.
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
   * @en Emitted when cell click changes.
   */
  cellClick: (row: any, column: HTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 双击单元格时触发
   * @param row 当前行
   * @paramEn row The row value.
   * @param column 当前列
   * @paramEn column The column value.
   * @param cell 当前单元格对象
   * @paramEn cell The cell value.
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
   * @en Emitted when cell dblclick changes.
   */
  cellDblclick: (row: any, column: HTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 右键单元格时触发
   * @param row 当前行
   * @paramEn row The row value.
   * @param column 当前列
   * @paramEn column The column value.
   * @param cell 当前单元格对象
   * @paramEn cell The cell value.
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
   * @en Emitted when cell contextmenu changes.
   */
  cellContextmenu: (row: any, column: HTableColumnData, cell: HTMLElement, evt: MouseEvent) =>
    cell instanceof HTMLElement && evt instanceof MouseEvent,
  /**
   * 行点击时触发
   * @param row 当前行
   * @paramEn row The row value.
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
   * @en Emitted when row click changes.
   */
  rowClick: (row: any, evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 行双击时触发
   * @param row 当前行
   * @paramEn row The row value.
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
   * @en Emitted when row dblclick changes.
   */
  rowDblclick: (row: any, evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 行右键时触发
   * @param row 当前行
   * @paramEn row The row value.
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
   * @en Emitted when row contextmenu changes.
   */
  rowContextmenu: (row: any, evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 当排序发生改变时触发
   * @param status 状态，以数组形式给予 \n column: 当前列; \n order 当前排序状态
   * @paramEn status The status value.
   * @en Emitted when sort change changes.
   */
  sortChange: (status: Array<{ column: HTableColumnData; order: HTableSortOrderEnum }>) =>
    Array.isArray(status),
  /**
   * 当拖动表头结束时，且宽度发生了改变时触发
   * @param newWidth 新的宽度
   * @paramEn newWidth The new width value.
   * @param oldWidth 原本宽度
   * @paramEn oldWidth The old width value.
   * @param column 当前列
   * @paramEn column The column value.
   * @param event 鼠标事件
   * @paramEn event The event value.
   * @en Emitted when header dragend changes.
   */
  headerDragend: (newWidth: number, oldWidth: number, column: any, event: MouseEvent) =>
    isNumber(newWidth) && isNumber(oldWidth) && event instanceof MouseEvent,
  /**
   * 滚动到顶部时触发
   * @en Emitted when scroll top changes.
   */
  scrollTop: () => true,
  /**
   * 滚动到底部时触发
   * @en Emitted when scroll bottom changes.
   */
  scrollBottom: () => true,
  /**
   * 单元格进入编辑状态时触发
   * @param context 编辑上下文
   * @paramEn context The editing context.
   * @en Emitted when cell editing starts.
   */
  cellEditStart: (context: Omit<HTableCellEditContext, 'oldValue'>) => isObject(context),
  /**
   * 单元格编辑成功提交时触发
   * @param context 编辑上下文
   * @paramEn context The editing context.
   * @en Emitted after a cell edit is committed.
   */
  cellEditCommit: (context: HTableCellEditContext) => isObject(context),
  /**
   * 单元格编辑取消时触发
   * @param context 编辑上下文
   * @paramEn context The editing context.
   * @en Emitted when a cell edit is cancelled.
   */
  cellEditCancel: (context: HTableCellEditContext) => isObject(context),
  /**
   * 单元格编辑提交失败时触发
   * @param context 编辑上下文
   * @paramEn context The editing context.
   * @param error 失败原因
   * @paramEn error The failure reason.
   * @en Emitted when a cell edit commit fails.
   */
  cellEditError: (context: HTableCellEditContext, _error: unknown) => isObject(context),
  /**
   * 表格统一状态更新时触发
   * @param state 表格状态
   * @paramEn state The table state.
   * @en Emitted when unified table state changes.
   */
  'update:state': (state: HTableState) => isObject(state),
  /**
   * 表格统一状态变化通知
   * @param state 表格状态
   * @paramEn state The table state.
   * @en Emitted when unified table state changes.
   */
  stateChange: (state: HTableState) => isObject(state),
  /**
   * 排序或过滤查询发生变化时触发
   * @param query 查询参数
   * @paramEn query The query parameters.
   * @en Emitted when sorting or filtering query changes.
   */
  queryChange: (query: HTableQuery) => isObject(query),
  /**
   * 已展开分组变化时触发
   * @param keys 已展开分组 key
   * @paramEn keys Expanded group keys.
   * @en Emitted when expanded group keys change.
   */
  'update:expandedGroupKeys': (keys: string[]) => Array.isArray(keys),
  /**
   * 分组展开状态切换时触发
   * @param key 分组 key
   * @paramEn key Group key.
   * @param expanded 是否展开
   * @paramEn expanded Whether the group is expanded.
   * @en Emitted when a group is toggled.
   */
  groupToggle: (key: string, expanded: boolean) => isString(key) && typeof expanded === 'boolean',
};

export const useTableColumnEmits = {
  /**
   * 当选中变化时触发
   * @param selected 已选择的行，如果 `multiple = true` 则是数组，反之是对象或 `undefined`
   * @paramEn selected The selected value.
   * @en Emitted when update:selected keys changes.
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
   * @en Emitted when filter change changes.
   */
  filterChange: (value: any) => isDefined(value) || isNil(value),
  /**
   * 当排序发生改变时触发
   * @param order 排序结果，为 null 时即取消排序
   * @paramEn order The order value.
   * @en Emitted when sort change changes.
   */
  sortChange: (order: HTableSortOrderEnum | null) =>
    isNil(order) || [HTableSortOrderEnum.DESC, HTableSortOrderEnum.ASC].includes(order),
};

export type TableEmits = typeof useTableEmits;
export type TableColumnEmits = typeof useTableColumnEmits;
