import { default as Table } from './src/Table';
import { default as TableColumn } from './src/TableColumn';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HTable = withInstall(Table, {
  TableColumn,
});

export const HTableColumn = withNoopInstall(TableColumn);

export default HTable;

export {
  analyzeTableDataProcessingCompatibility,
  processTableData,
} from './src/data-processing/engine';
export { createTableDataProcessingWorkerSource } from './src/data-processing/inline-worker';
export {
  createTableDataProcessingRequest,
  H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
} from './src/data-processing/protocol';

export type {
  HTableDataPrimitive,
  HTableDataNumericColumn,
  HTableDataPrimitiveColumn,
  HTableDataProjection,
  HTableDataFilter,
  HTableDataSort,
  HTableDataProcessingInput,
  HTableDataProcessingOutput,
  HTableDataOperationKind,
  HTableDataOperationCandidate,
  HTableDataProcessingCompatibilityIssue,
  HTableDataProcessingCompatibility,
} from './src/data-processing/types';
export type {
  HTableDataProcessingRequest,
  HTableDataProcessingSuccessResponse,
  HTableDataProcessingSerializedError,
  HTableDataProcessingErrorResponse,
  HTableDataProcessingResponse,
} from './src/data-processing/protocol';

export {
  HTableSortOrderEnum,
  HTableAlignEnum,
  HTableColumnContextKey,
  HTableColumnSelectionKey,
  HTableColumnFilterKey,
  HTableGroupContextKey,
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
  HTableVirtualOptions,
  HTableVisibleRange,
  HTableState,
  HTableStateSort,
  HTableQuery,
  HTableCellEditContext,
  HTableEditorType,
  HTableGroupBy,
  HTableAggregationType,
  HTableAggregationMethod,
  HTableAggregations,
  HTableGroupContext,
  HTableGroupRowDataType,
  HTableGroupScopeSlots,
  HTableDataProcessingMode,
  HTableDataProcessingFallbackReason,
  HTableDataProcessingOptions,
  HTableDataProcessingState,
  HTableDataWorkerFactory,
  HTableDataWorkerFactoryContext,
} from './src/utils/types';
