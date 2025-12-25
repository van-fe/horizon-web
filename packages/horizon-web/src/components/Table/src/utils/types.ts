import type { ComputedRef, CSSProperties, Ref, VNode } from 'vue';
import type { TableColumnProps } from '../composables/useProps';
import type { HorizonWebSetupContext, Promisable } from '@aurora/utils';
import type { TableColumnEmits } from '../composables/useEmits';
import type { TableColumnSlots } from '../composables/useSlots';

export const HTableTransformedRowContextKey = Symbol('table transformed row context key');

export const HTableColumnContextKey = Symbol('table column context key');
export const HTableColumnSelectionKey = Symbol('table column selection key');
export const HTableColumnFilterKey = Symbol('table column filter key');

export type HTableRowKeyType = string | number;

export type HTableRowDataType = (any & HTableTreeRowDataType) & {};

export interface HTableTreeRowDataType {
  children?: HTableRowDataType[];
  isLeaf?: boolean;
}

export type HTableTransformedRowDataType = HTableRowDataType & {
  [HTableTransformedRowContextKey]: {
    uuid: string;
    index: number;
    visible: Ref<Record<string, boolean>>;
    parentUuid: string | null;
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
  Context extends HorizonWebSetupContext<TableColumnEmits, TableColumnSlots> = HorizonWebSetupContext<
    TableColumnEmits,
    TableColumnSlots
  >,
> {
  uuid: string;
  props: TableColumnProps;
  emit: Context['emit'];
  slots: Context['slots'];
  children: HTableInsertedColumnData<Context>[];
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
  isSelectable: ComputedRef<(rowIndex: number) => boolean>;
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
