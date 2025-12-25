import type { ComputedRef, CSSProperties, Ref, VNode } from 'vue';
import type { TableColumnProps } from '../composables/useProps';
import type { HorizonWebSetupContext, Promisable } from '@aurora/utils';
import type { TableColumnEmits } from '../composables/useEmits';
import type { TableColumnSlots } from '../composables/useSlots';

export const NTableTransformedRowContextKey = Symbol('table transformed row context key');

export const NTableColumnContextKey = Symbol('table column context key');
export const NTableColumnSelectionKey = Symbol('table column selection key');
export const NTableColumnFilterKey = Symbol('table column filter key');

export type NTableRowKeyType = string | number;

export type NTableRowDataType = (any & NTableTreeRowDataType) & {};

export interface NTableTreeRowDataType {
  children?: NTableRowDataType[];
  isLeaf?: boolean;
}

export type NTableTransformedRowDataType = NTableRowDataType & {
  [NTableTransformedRowContextKey]: {
    uuid: string;
    index: number;
    visible: Ref<Record<string, boolean>>;
    parentUuid: string | null;
    level: number;
    isLeaf: boolean;
  };
};

export enum NTableSortOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum NTableAlignEnum {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export type NTableSortType = {
  prop: string;
  order: NTableSortOrderEnum;
  init?: any;
  silent?: any;
};

export type NTableSummaryMethodType = (data: {
  /**
   * Flatten columns data
   */
  columns: NTableColumnData[];
  /**
   * origin table data
   */
  data: NTableRowDataType[];
  /**
   * flatten by row-id's table data
   */
  flattenData: NTableTransformedRowDataType[];
}) => (VNode | string)[][];

export type NTableSpanMethodType = (data: {
  row: any;
  column: any;
  rowIndex: number;
  columnIndex: number;
}) => number[] | { rowSpan: number; colSpan: number } | void;

export type NTableDynamicLoadMethodType = (
  row: NTableTransformedRowDataType,
) => Promisable<NTableRowDataType[]>;

export interface NTableHeaderCellScopeSlots {
  column: NTableColumnData | {};
  columnIndex: number;
  fixed: 'left' | 'right' | 'hover' | undefined;
}

export interface NTableFooterCellScopeSlots extends NTableHeaderCellScopeSlots {
  /**
   * The row index of summary footer. Starts with 0
   */
  rowIndex: number;
}

export interface NTableCellScopeSlots extends NTableHeaderCellScopeSlots {
  rowIndex: number;
  row: NTableTransformedRowDataType | {};
}

export interface NTableInsertedColumnData<
  Context extends HorizonWebSetupContext<TableColumnEmits, TableColumnSlots> = HorizonWebSetupContext<
    TableColumnEmits,
    TableColumnSlots
  >,
> {
  uuid: string;
  props: TableColumnProps;
  emit: Context['emit'];
  slots: Context['slots'];
  children: NTableInsertedColumnData<Context>[];
}

export interface NTableColumnContextData {
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
  prevColumn: NTableColumnData | undefined;
  prevColumnsWidthSum: number;
  /**
   * prev columns
   */
  nextColumn: NTableColumnData | undefined;
  nextColumnsWidthSum: number;
  /**
   * parents
   */
  parentColumn: NTableColumnData | undefined;
  parentColumnsHeightSum: number;
  /**
   * children
   */
  childrenEachRowColumnsHeightSum: number;
}

export interface NTableColumnSelectionData {
  checkedRows: Set<unknown>;
  isSelectable: ComputedRef<(rowIndex: number) => boolean>;
  isCheckedAll: ComputedRef<(rowsData: NTableTransformedRowDataType[]) => boolean>;
  isIndeterminate: ComputedRef<(rowsData: NTableTransformedRowDataType[]) => boolean>;
  handleSelect: (rowData: NTableTransformedRowDataType, rowIndex: number) => void;
  handleSelectAll: () => void;
  handleClear: (ignoreSelectable: boolean) => void;
  getSelectionRows: () => NTableTransformedRowDataType[];
  toggleRowSelection: (
    rowKey: NTableRowKeyType | NTableRowKeyType[],
    selected?: boolean,
    ignoreSelectable?: boolean,
  ) => void;
}

export interface NTableColumnFilterData {
  currentFilterValue: Ref<unknown>;
}

export interface NTableColumnData extends NTableInsertedColumnData {
  headerColSpan: number;
  headerRowSpan: number;
  index: number;
  calcChildren: NTableColumnData[];
  [NTableColumnContextKey]: NTableColumnContextData;
  [NTableColumnSelectionKey]: NTableColumnSelectionData;
  [NTableColumnFilterKey]: NTableColumnFilterData;
}

export type NTableFixedValue = 'left' | 'right' | 'hover' | undefined;
