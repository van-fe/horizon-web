import type { ComputedRef, CSSProperties, Ref, VNode } from 'vue';
import type { HorizonWebSetupContext, Promisable } from '@aurora/utils';
import type { TableColumnEmits } from '../composables/useEmits';
import type { TableColumnSlots } from '../composables/useSlots';

export const HTableTransformedRowContextKey = Symbol('table transformed row context key');

export const HTableColumnContextKey = Symbol('table column context key');
export const HTableColumnSelectionKey = Symbol('table column selection key');
export const HTableColumnFilterKey = Symbol('table column filter key');
export const HTableGroupContextKey = Symbol('table group context key');

export type HTableRowKeyType = string | number;

export interface HTableVirtualOptions {
  /**
   * 固定行高。设置后使用固定尺寸虚拟布局
   * @en Fixed row height used by fixed-size virtual layout.
   */
  itemSize?: number;
  /**
   * 动态高度模式下的预估最小行高
   * @en Estimated minimum row height for dynamic-size layout.
   */
  minItemSize?: number;
  /**
   * 可视区域前后预渲染的像素距离
   * @en Pixel buffer rendered before and after the viewport.
   */
  buffer?: number;
  /**
   * 是否测量实际行高
   * @en Whether to measure actual row heights.
   */
  dynamic?: boolean;
}

export interface HTableVisibleRange {
  startIndex: number;
  endIndex: number;
  visibleStartIndex: number;
  visibleEndIndex: number;
}

export type HTableEditorType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker';

export interface HTableCellEditContext {
  row: HTableTransformedRowDataType;
  rowIndex: number;
  column: HTableColumnData;
  value: unknown;
  oldValue: unknown;
}

export interface HTableEditingCell {
  rowKey: HTableRowKeyType;
  columnKey: string;
}

export interface HTableStateSort {
  columnKey: string;
  field?: string;
  order: HTableSortOrderEnum;
}

export interface HTableState {
  version: 1;
  sorting: HTableStateSort[];
  filters: Record<string, unknown>;
  selection: Record<string, HTableRowKeyType[]>;
  expanded: HTableRowKeyType[];
  columnOrder: string[];
  columnVisibility: Record<string, boolean>;
  columnFixed: Record<string, HTableFixedValue>;
  columnWidths: Record<string, number>;
}

export interface HTableQuery {
  sorting: HTableStateSort[];
  filters: Record<string, unknown>;
}

export type HTableGroupBy = string | string[] | ((row: HTableTransformedRowDataType) => unknown);

export type HTableAggregationType = 'sum' | 'count' | 'average' | 'min' | 'max';

export type HTableAggregationMethod = (
  values: unknown[],
  rows: HTableTransformedRowDataType[],
  field: string,
) => unknown;

export type HTableAggregations = Record<string, HTableAggregationType | HTableAggregationMethod>;

export interface HTableGroupContext {
  key: string;
  value: unknown;
  label: string;
  field?: string;
  level: number;
  rows: HTableTransformedRowDataType[];
  aggregates: Record<string, unknown>;
  expanded: boolean;
}

export type HTableGroupRowDataType = HTableTransformedRowDataType & {
  [HTableGroupContextKey]: HTableGroupContext;
};

export interface HTableGroupScopeSlots extends HTableGroupContext {
  toggle: () => void;
}

export type HTableRowDataType = (any & HTableTreeRowDataType) & {};

export interface HTableTreeRowDataType {
  children?: HTableRowDataType[];
  isLeaf?: boolean;
}

export type HTableTransformedRowDataType = HTableRowDataType & {
  [HTableTransformedRowContextKey]: {
    uuid: HTableRowKeyType;
    index: number;
    siblingIndex: number;
    visible: Ref<Record<string, boolean>>;
    parentUuid: HTableRowKeyType | null;
    level: number;
    isLeaf: boolean;
  };
};

export enum HTableSortOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum HTableAlignEnum {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export type HTableSortType = {
  prop: string;
  order: HTableSortOrderEnum;
  init?: any;
  silent?: any;
};

export type HTableSummaryMethodType = (data: {
  /**
   * Flatten columns data
   */
  columns: HTableColumnData[];
  /**
   * origin table data
   */
  data: HTableRowDataType[];
  /**
   * flatten by row-id's table data
   */
  flattenData: HTableTransformedRowDataType[];
}) => (VNode | string)[][];

export type HTableSpanMethodType = (data: {
  row: any;
  column: any;
  rowIndex: number;
  columnIndex: number;
}) => number[] | { rowSpan: number; colSpan: number } | void;

export type HTableDynamicLoadMethodType = (
  row: HTableTransformedRowDataType,
) => Promisable<HTableRowDataType[]>;

export interface HTableHeaderCellScopeSlots {
  column: HTableColumnData | {};
  columnIndex: number;
  fixed: 'left' | 'right' | 'hover' | undefined;
}

export interface HTableFooterCellScopeSlots extends HTableHeaderCellScopeSlots {
  /**
   * The row index of summary footer. Starts with 0
   */
  rowIndex: number;
}

export interface HTableCellScopeSlots extends HTableHeaderCellScopeSlots {
  rowIndex: number;
  row: HTableTransformedRowDataType | {};
}

export interface HTableInsertedColumnData<
  Context extends HorizonWebSetupContext<TableColumnEmits, TableColumnSlots> =
    HorizonWebSetupContext<TableColumnEmits, TableColumnSlots>,
  ColumnProps extends Record<string, any> = Record<string, any>,
> {
  uuid: string;
  props: ColumnProps;
  emit: Context['emit'];
  slots: Context['slots'];
  children: HTableInsertedColumnData<Context, ColumnProps>[];
}

export interface HTableColumnContextData {
  /**
   * append size style to column which is created by column analysis method
   */
  sizeStyle: CSSProperties;
  /**
   * resized width. When column can be resized, this value will be filled
   */
  resizeWidth: number;
  /**
   * Whether is resizing the column
   */
  isResizing: boolean;
  /**
   * append size style to which set show-overflow-tooltip column
   */
  overflowStyle: CSSProperties;
  /**
   * self element
   */
  selfElement: Ref<HTMLTableCellElement | undefined>;
  /**
   * prev columns
   */
  prevColumn: HTableColumnData | undefined;
  prevColumnsWidthSum: number;
  /**
   * prev columns
   */
  nextColumn: HTableColumnData | undefined;
  nextColumnsWidthSum: number;
  /**
   * parents
   */
  parentColumn: HTableColumnData | undefined;
  parentColumnsHeightSum: number;
  /**
   * children
   */
  childrenEachRowColumnsHeightSum: number;
}

export interface HTableColumnSelectionData {
  checkedRows: Set<unknown>;
  isSelectable: ComputedRef<(rowData: HTableTransformedRowDataType, rowIndex: number) => boolean>;
  isRowChecked: ComputedRef<(rowData: HTableTransformedRowDataType) => boolean>;
  isRowIndeterminate: ComputedRef<(rowData: HTableTransformedRowDataType) => boolean>;
  isCheckedAll: ComputedRef<(rowsData: HTableTransformedRowDataType[]) => boolean>;
  isIndeterminate: ComputedRef<(rowsData: HTableTransformedRowDataType[]) => boolean>;
  handleSelect: (rowData: HTableTransformedRowDataType, rowIndex: number) => void;
  handleSelectAll: () => void;
  handleClear: (ignoreSelectable: boolean) => void;
  getSelectionRows: () => HTableTransformedRowDataType[];
  toggleRowSelection: (
    rowKey: HTableRowKeyType | HTableRowKeyType[],
    selected?: boolean,
    ignoreSelectable?: boolean,
  ) => void;
}

export interface HTableColumnFilterData {
  currentFilterValue: Ref<unknown>;
}

export interface HTableColumnData extends HTableInsertedColumnData {
  headerColSpan: number;
  headerRowSpan: number;
  index: number;
  calcChildren: HTableColumnData[];
  [HTableColumnContextKey]: HTableColumnContextData;
  [HTableColumnSelectionKey]: HTableColumnSelectionData;
  [HTableColumnFilterKey]: HTableColumnFilterData;
}

export type HTableFixedValue = 'left' | 'right' | 'hover' | undefined;
