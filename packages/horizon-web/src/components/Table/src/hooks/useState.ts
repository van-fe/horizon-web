import { computed, nextTick, ref, watch, type Ref, type SetupContext } from 'vue';
import type { TableProps } from '../composables/useProps';
import type { TableEmits } from '../composables/useEmits';
import type {
  HTableColumnData,
  HTableFixedValue,
  HTableInsertedColumnData,
  HTableState,
  HTableStateSort,
  HTableRowKeyType,
} from '../utils/types';
import {
  HTableColumnContextKey,
  HTableColumnFilterKey,
  HTableColumnSelectionKey,
} from '../utils/types';

export interface HTableStateOptions {
  props: TableProps;
  emit: SetupContext<TableEmits>['emit'];
  columns: Ref<HTableInsertedColumnData[]>;
  analysisColumns: Ref<{
    columnGroups: HTableColumnData[][];
    flattenColumns: HTableColumnData[];
  }>;
  currentSorts: Ref<Map<HTableColumnData, HTableStateSort['order']>>;
  fixedStore: Ref<Map<string, HTableFixedValue>>;
  visibleStore: Ref<Map<string, boolean>>;
  sortStore: Ref<Map<string, number>>;
  expandedRows: Ref<Set<HTableRowKeyType>>;
  refreshLayout: () => void;
}

function columnIdentity(column: HTableInsertedColumnData) {
  return String(column.props.columnKey ?? column.props.field ?? column.uuid);
}

function flattenColumns(columns: HTableInsertedColumnData[]) {
  const result: HTableInsertedColumnData[] = [];
  const visit = (current: HTableInsertedColumnData[]) => {
    current.forEach(column => {
      result.push(column);
      visit(column.children);
    });
  };
  visit(columns);
  return result;
}

function mergeState(base: HTableState, state?: Partial<HTableState>): HTableState {
  if (!state) return base;
  return {
    ...base,
    ...state,
    version: 1,
    sorting: state.sorting ?? base.sorting,
    filters: { ...base.filters, ...state.filters },
    selection: { ...base.selection, ...state.selection },
    expanded: state.expanded ?? base.expanded,
    columnOrder: state.columnOrder ?? base.columnOrder,
    columnVisibility: { ...base.columnVisibility, ...state.columnVisibility },
    columnFixed: { ...base.columnFixed, ...state.columnFixed },
    columnWidths: { ...base.columnWidths, ...state.columnWidths },
  };
}

/**
 * 汇总并恢复排序、过滤、选择、展开和列配置状态。
 * @en Aggregates and restores sorting, filtering, selection, expansion, and column state.
 */
export default function useState(options: HTableStateOptions) {
  const applyingState = ref(false);
  const initialized = ref(false);
  let initialState: HTableState | undefined;
  let lastEmittedState = '';
  let lastQuery = '';

  function emitState(next = getState()) {
    if (!initialized.value || applyingState.value) return;
    const serialized = JSON.stringify(next);
    if (serialized === lastEmittedState) return;

    lastEmittedState = serialized;
    options.emit('update:state', structuredClone(next));
    options.emit('stateChange', structuredClone(next));

    const query = { sorting: next.sorting, filters: next.filters };
    const serializedQuery = JSON.stringify(query);
    if (serializedQuery !== lastQuery) {
      lastQuery = serializedQuery;
      options.emit('queryChange', structuredClone(query));
    }
  }

  function getState(): HTableState {
    const insertedColumns = flattenColumns(options.columns.value);
    const insertedByUuid = new Map(insertedColumns.map(column => [column.uuid, column]));
    const analyzedColumns = options.analysisColumns.value.flattenColumns;

    const sorting = Array.from(options.currentSorts.value, ([column, order]) => ({
      columnKey: columnIdentity(column),
      field: column.props.field,
      order,
    }));
    const filters: Record<string, unknown> = {};
    const selection: Record<string, any[]> = {};
    analyzedColumns.forEach(column => {
      const key = columnIdentity(column);
      const filterValue = column[HTableColumnFilterKey].currentFilterValue.value;
      if (filterValue !== undefined && filterValue !== null) filters[key] = filterValue;
      if (column.props.type === 'selection') {
        selection[key] = Array.from(column[HTableColumnSelectionKey].checkedRows);
      }
    });

    const columnVisibility: Record<string, boolean> = {};
    const columnFixed: Record<string, HTableFixedValue> = {};
    const columnWidths: Record<string, number> = {};
    insertedColumns.forEach(column => {
      const key = columnIdentity(column);
      columnVisibility[key] = options.visibleStore.value.get(column.uuid) ?? column.props.visible;
      columnFixed[key] = options.fixedStore.value.get(column.uuid);

      const analyzed = analyzedColumns.find(current => current.uuid === column.uuid);
      const width = analyzed?.[HTableColumnContextKey].resizeWidth;
      if (width && width > 0) columnWidths[key] = width;
    });

    const columnOrder = insertedColumns
      .toSorted(
        (a, b) =>
          (options.sortStore.value.get(a.uuid) ?? insertedColumns.indexOf(a)) -
          (options.sortStore.value.get(b.uuid) ?? insertedColumns.indexOf(b)),
      )
      .map(columnIdentity);

    // Read every store entry so state remains reactive even when a column is temporarily hidden.
    options.visibleStore.value.forEach((_value, uuid) => insertedByUuid.get(uuid));
    options.fixedStore.value.forEach((_value, uuid) => insertedByUuid.get(uuid));
    options.sortStore.value.forEach((_value, uuid) => insertedByUuid.get(uuid));

    return {
      version: 1,
      sorting,
      filters,
      selection,
      expanded: [...options.expandedRows.value],
      columnOrder,
      columnVisibility,
      columnFixed,
      columnWidths,
    };
  }

  function applyState(state: Partial<HTableState>, replace = false) {
    const current = getState();
    const next = replace ? (structuredClone(state) as HTableState) : mergeState(current, state);
    const insertedColumns = flattenColumns(options.columns.value);
    const byIdentity = new Map(insertedColumns.map(column => [columnIdentity(column), column]));

    applyingState.value = true;

    options.expandedRows.value = new Set(next.expanded);
    options.emit('update:expandRowKeys', next.expanded);
    Object.entries(next.columnVisibility).forEach(([key, visible]) => {
      const column = byIdentity.get(key);
      if (column && !column.props.lockVisible) options.visibleStore.value.set(column.uuid, visible);
    });
    Object.entries(next.columnFixed).forEach(([key, fixed]) => {
      const column = byIdentity.get(key);
      if (!column || column.props.lockFixed) return;
      if (fixed) options.fixedStore.value.set(column.uuid, fixed);
      else options.fixedStore.value.delete(column.uuid);
    });
    next.columnOrder.forEach((key, index) => {
      const column = byIdentity.get(key);
      if (column && !column.props.lockPosition) options.sortStore.value.set(column.uuid, index);
    });
    void nextTick(() => {
      const analyzedByIdentity = new Map(
        options.analysisColumns.value.flattenColumns.map(column => [
          columnIdentity(column),
          column,
        ]),
      );
      const nextSorts = new Map<HTableColumnData, HTableStateSort['order']>();
      next.sorting.forEach(sort => {
        const column = analyzedByIdentity.get(sort.columnKey);
        if (column) nextSorts.set(column, sort.order);
      });
      options.currentSorts.value = nextSorts;

      Object.entries(next.filters).forEach(([key, value]) => {
        const column = analyzedByIdentity.get(key);
        if (column) column[HTableColumnFilterKey].currentFilterValue.value = value;
      });
      options.analysisColumns.value.flattenColumns.forEach(column => {
        const key = columnIdentity(column);
        if (!(key in next.filters)) {
          column[HTableColumnFilterKey].currentFilterValue.value = undefined;
        }
        if (column.props.type === 'selection' && key in next.selection) {
          const values = next.selection[key];
          column.emit('update:selectedKeys', column.props.multiple ? values : values[0]);
        }
      });
      options.analysisColumns.value.flattenColumns.forEach(column => {
        const width = next.columnWidths[columnIdentity(column)];
        column[HTableColumnContextKey].resizeWidth =
          Number.isFinite(width) && width > 0 ? width : -1;
      });

      void nextTick(() => {
        options.refreshLayout();
        applyingState.value = false;
        emitState();
      });
    });
  }

  function setState(state: Partial<HTableState>) {
    applyState(state);
  }

  function resetState() {
    if (initialState) applyState(initialState, true);
  }

  function resetColumnState() {
    if (!initialState) return;
    applyState(
      {
        ...getState(),
        columnOrder: initialState.columnOrder,
        columnVisibility: initialState.columnVisibility,
        columnFixed: initialState.columnFixed,
        columnWidths: initialState.columnWidths,
      },
      true,
    );
  }

  function exportState() {
    return structuredClone(getState());
  }

  function restoreState(state: Partial<HTableState>) {
    if (state.version !== undefined && state.version !== 1) return false;
    const base = initialState ?? getState();
    applyState(
      {
        ...base,
        ...state,
        sorting: state.sorting ?? base.sorting,
        filters: state.filters ?? base.filters,
        selection: state.selection ?? base.selection,
        expanded: state.expanded ?? base.expanded,
        columnOrder: state.columnOrder ?? base.columnOrder,
        columnVisibility: state.columnVisibility ?? base.columnVisibility,
        columnFixed: state.columnFixed ?? base.columnFixed,
        columnWidths: state.columnWidths ?? base.columnWidths,
        version: 1,
      },
      true,
    );
    return true;
  }

  const state = computed(getState);

  watch(
    () => options.columns.value.length,
    length => {
      if (!length || initialized.value) return;
      void nextTick(() => {
        initialState = structuredClone(getState());
        initialized.value = true;
        if (options.props.defaultState) applyState(options.props.defaultState);
        if (options.props.state) applyState(options.props.state);
      });
    },
    { immediate: true },
  );

  watch(
    () => options.props.state,
    next => {
      if (initialized.value && next) applyState(next);
    },
    { deep: true },
  );

  watch(state, next => emitState(next), { deep: true });

  return {
    exportState,
    getState,
    resetColumnState,
    resetState,
    restoreState,
    setState,
    state,
  };
}
