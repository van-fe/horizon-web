import { default as Table } from './src/Table';
import { default as TableColumn } from './src/TableColumn';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const NTableV3 = withInstall(Table, {
  TableColumn,
});

export const NTableColumnV3 = withNoopInstall(TableColumn);

export default NTableV3;

export {
  NTableSortOrderEnum,
  NTableAlignEnum,
  NTableColumnContextKey,
  NTableColumnSelectionKey,
  NTableColumnFilterKey,
} from './src/utils/types';

export type {
  NTableRowKeyType,
  NTableRowDataType,
  NTableTransformedRowDataType,
  NTableSortType,
  NTableSummaryMethodType,
  NTableSpanMethodType,
  NTableDynamicLoadMethodType,
  NTableHeaderCellScopeSlots,
  NTableFooterCellScopeSlots,
  NTableCellScopeSlots,
  NTableColumnData,
  NTableInsertedColumnData,
  NTableColumnContextData,
  NTableColumnSelectionData,
  NTableColumnFilterData,
} from './src/utils/types';
