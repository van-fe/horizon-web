import type { CSSProperties, ComputedRef, Ref, SetupContext } from 'vue';
import { computed, markRaw, ref, shallowReactive, watch } from 'vue';
import { cssVariable, sizeUnitTransform } from '@aurora/utils';
import type { TableEmits } from '../composables/useEmits';
import type {
  HTableColumnContextData,
  HTableColumnData,
  HTableInsertedColumnData,
  HTableRowKeyType,
  HTableTransformedRowDataType,
} from '../utils/types';
import {
  HTableColumnContextKey,
  HTableColumnFilterKey,
  HTableColumnSelectionKey,
} from '../utils/types';
import useFilter from './useFilter';
import useSelection from './useSelection';

export const HTableColumnRuntimeKey = Symbol('table column runtime');

export interface HTableColumnFilterPickerExposes {
  hidePopover: () => void;
}

export interface HTableColumnRuntime {
  column: HTableColumnData;
  selection: ReturnType<typeof useSelection>;
  filter: ReturnType<typeof useFilter>;
  filterUi: {
    searchDraft: Ref<unknown>;
    pickerRef: Ref<HTableColumnFilterPickerExposes | undefined>;
    selectOptions: ComputedRef<Array<{ label: unknown; value: unknown }>>;
  };
}

export type HTableColumnWithRuntime = HTableInsertedColumnData & {
  [HTableColumnRuntimeKey]: HTableColumnRuntime;
};

function getColumnWidthStyle(column: HTableInsertedColumnData): CSSProperties {
  switch (column.props.type) {
    default:
    case 'default':
    case 'index':
    case 'expand':
    case 'selection':
      return {
        width: sizeUnitTransform(column.props.width),
        minWidth: sizeUnitTransform(column.props.minWidth),
      };
    case 'drag':
      return {
        width: sizeUnitTransform(column.props.width ?? 40),
        minWidth: sizeUnitTransform(column.props.minWidth ?? 40),
      };
  }
}

function getColumnOverflowTooltipStyle(column: HTableInsertedColumnData): CSSProperties {
  switch (column.props.type) {
    default:
    case 'default':
    case 'index':
    case 'expand':
    case 'selection':
      return {
        width: column.props.width
          ? `calc(${sizeUnitTransform(column.props.width)} - ${cssVariable('table', 'spacing', 'cell', 'x', 'padding')} * 2 - var(--table-border-width))`
          : undefined,
        minWidth: column.props.minWidth
          ? `calc(${sizeUnitTransform(column.props.minWidth)} - ${cssVariable('table', 'spacing', 'cell', 'x', 'padding')} * 2 - var(--table-border-width))`
          : undefined,
      };
    case 'drag':
      return {};
  }
}

function attachRuntime<T extends HTableInsertedColumnData>(
  column: T,
  runtime: HTableColumnRuntime,
): T & HTableColumnWithRuntime {
  Object.defineProperty(column, HTableColumnRuntimeKey, {
    configurable: false,
    enumerable: false,
    value: runtime,
  });
  return column as T & HTableColumnWithRuntime;
}

export function attachColumnRuntime<T extends HTableInsertedColumnData>(
  column: T,
  runtime: HTableColumnRuntime,
) {
  return attachRuntime(column, markRaw(runtime));
}

export function getColumnRuntime(column: HTableInsertedColumnData): HTableColumnRuntime {
  const runtime = (column as HTableColumnWithRuntime)[HTableColumnRuntimeKey];

  if (!runtime) {
    throw new Error(`Table column runtime is missing for column '${column.uuid}'.`);
  }

  return runtime;
}

/**
 * 为单个列组件创建生命周期稳定的选择、过滤和布局状态。
 * @en Creates lifecycle-stable selection, filtering, and layout state for one table column.
 */
export default function useColumnRuntime(
  column: HTableInsertedColumnData,
  emit: SetupContext<TableEmits>['emit'],
  flattenData: Ref<HTableTransformedRowDataType[]>,
  useBuiltInDataOperations: () => boolean,
): HTableColumnRuntime {
  const selection = useSelection(column, emit, flattenData);
  const filter = useFilter(column, emit, flattenData, useBuiltInDataOperations);
  const layoutContext = shallowReactive<HTableColumnContextData>({
    sizeStyle: getColumnWidthStyle(column),
    resizeWidth: -1,
    isResizing: false,
    overflowStyle: getColumnOverflowTooltipStyle(column),
    prevColumnsWidthSum: 0,
    nextColumnsWidthSum: 0,
    prevColumn: undefined,
    nextColumn: undefined,
    selfElement: ref<HTMLTableCellElement>(),
    parentColumn: undefined,
    parentColumnsHeightSum: 0,
    childrenEachRowColumnsHeightSum: 0,
  });

  watch(
    () => [column.props.type, column.props.width, column.props.minWidth] as const,
    () => {
      layoutContext.sizeStyle = getColumnWidthStyle(column);
      layoutContext.overflowStyle = getColumnOverflowTooltipStyle(column);
    },
  );

  const searchDraft = ref(filter.currentFilterValue.value);
  const pickerRef = ref<HTableColumnFilterPickerExposes>();
  const selectOptions = computed<Array<{ label: unknown; value: unknown }>>(() => {
    const field = column.props.field;
    if (column.props.filterType !== 'select' || !field) return [];

    return [...new Set(flattenData.value.map(row => row[field]))].map(value => ({
      label: value,
      value,
    }));
  });

  watch(filter.currentFilterValue, value => {
    searchDraft.value = value;
  });

  const columnData = markRaw<HTableColumnData>({
    ...column,
    headerColSpan: 1,
    headerRowSpan: 1,
    calcChildren: [],
    index: -1,
    [HTableColumnContextKey]: layoutContext,
    [HTableColumnSelectionKey]: {
      get checkedRows() {
        return selection.checkedRows.value;
      },
      isSelectable: selection.isSelectable,
      isRowChecked: selection.isRowChecked,
      isRowIndeterminate: selection.isRowIndeterminate,
      isCheckedAll: selection.isCheckedAll,
      isIndeterminate: selection.isIndeterminate,
      handleSelect: selection.handleSelect,
      handleSelectAll: () => selection.handleSelectAll(flattenData.value),
      handleClear: (ignoreSelectable: boolean) =>
        selection.handleClear(flattenData.value, ignoreSelectable),
      getSelectionRows: () => selection.getSelectionRows(flattenData.value),
      toggleRowSelection: (
        rowKey: HTableRowKeyType | HTableRowKeyType[],
        selected?: boolean,
        ignoreSelectable?: boolean,
      ) => selection.toggleRowSelection(flattenData.value, rowKey, selected, ignoreSelectable),
    },
    [HTableColumnFilterKey]: {
      currentFilterValue: filter.currentFilterValue,
    },
  });

  const runtime = markRaw<HTableColumnRuntime>({
    column: columnData,
    selection,
    filter,
    filterUi: {
      searchDraft,
      pickerRef,
      selectOptions,
    },
  });

  attachRuntime(columnData, runtime);
  return runtime;
}
