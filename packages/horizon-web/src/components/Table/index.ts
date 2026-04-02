import { default as Table } from './src/Table';
import { default as TableColumn } from './src/TableColumn';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HTable = withInstall(Table, {
  TableColumn,
});

export const HTableColumn = withNoopInstall(TableColumn);

export default HTable;

export {
  HTableSortOrderEnum,
  HTableAlignEnum,
  HTableColumnContextKey,
  HTableColumnSelectionKey,
  HTableColumnFilterKey,
} from './src/utils/types';

export type {
  HTableRowKeyType,
  HTableRowDataType,
  HTableTransformedRowDataType,
  HTableSortType,
  HTableSummaryMethodType,
  HTableSpanMethodType,
  HTableDynamicLoadMethodType,
  HTableHeaderCellScopeSlots,
  HTableFooterCellScopeSlots,
  HTableCellScopeSlots,
  HTableColumnData,
  HTableInsertedColumnData,
  HTableColumnContextData,
  HTableColumnSelectionData,
  HTableColumnFilterData,
} from './src/utils/types';
