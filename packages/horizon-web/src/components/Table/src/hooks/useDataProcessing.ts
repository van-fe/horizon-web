import {
  computed,
  onBeforeUnmount,
  shallowRef,
  toRaw,
  watch,
  type ComputedRef,
  type Ref,
  type SetupContext,
} from 'vue';
import get from 'lodash/get';
import type { TableProps } from '../composables/useProps';
import type { TableEmits } from '../composables/useEmits';
import type {
  HTableColumnData,
  HTableDataProcessingFallbackReason,
  HTableDataProcessingMode,
  HTableDataProcessingOptions,
  HTableDataProcessingState,
  HTableDataWorkerFactory,
  HTableTransformedRowDataType,
} from '../utils/types';
import { HTableColumnFilterKey, HTableSortOrderEnum } from '../utils/types';
import {
  createTableDataProcessingExecutor,
  createTableDataProcessingRequest,
  HTableDataProcessingWorkerUnavailableError,
  type HTableDataFilter,
  type HTableDataPrimitive,
  type HTableDataPrimitiveColumn,
  type HTableDataProcessingExecutor,
  type HTableDataProcessingInput,
  type HTableDataSort,
} from '../data-processing';
import { createTableFilterPredicate, isTableFilterValueActive } from './useFilter';
import { getColumnRuntime } from './useColumnRuntime';

const DEFAULT_WORKER_THRESHOLD = 10_000;
const DEFAULT_WORKER_DEBOUNCE = 16;
const DEFAULT_WORKER_TIMEOUT = 30_000;

interface HTableDataProcessingHookOptions {
  props: TableProps;
  rows: Ref<HTableTransformedRowDataType[]>;
  columns: Ref<{ flattenColumns: HTableColumnData[] }>;
  currentSorts: Ref<Map<HTableColumnData, HTableSortOrderEnum>>;
  compareRows: (a: HTableTransformedRowDataType, b: HTableTransformedRowDataType) => number;
  enabled: ComputedRef<boolean>;
  disabledReason: ComputedRef<HTableDataProcessingFallbackReason | undefined>;
  emit: SetupContext<TableEmits>['emit'];
}

interface NormalizedDataProcessingOptions {
  mode: HTableDataProcessingMode;
  workerThreshold: number;
  debounce: number;
  workerTimeout: number;
  workerFactory?: HTableDataWorkerFactory;
}

function now() {
  return typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now();
}

function normalizeOptions(value: TableProps['dataProcessing']): NormalizedDataProcessingOptions {
  const options: HTableDataProcessingOptions =
    value && typeof value === 'object' ? value : { mode: value || 'sync' };
  return {
    mode: options.mode ?? 'sync',
    workerThreshold: Math.max(
      0,
      Number.isFinite(options.workerThreshold)
        ? Math.floor(options.workerThreshold!)
        : DEFAULT_WORKER_THRESHOLD,
    ),
    debounce: Math.max(
      0,
      Number.isFinite(options.debounce) ? Math.floor(options.debounce!) : DEFAULT_WORKER_DEBOUNCE,
    ),
    workerTimeout: Math.max(
      0,
      Number.isFinite(options.workerTimeout)
        ? Math.floor(options.workerTimeout!)
        : DEFAULT_WORKER_TIMEOUT,
    ),
    workerFactory: options.workerFactory,
  };
}

function isStrictPrimitive(value: unknown): value is HTableDataPrimitive {
  return (
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && !Number.isNaN(value))
  );
}

function mapStrictPrimitiveColumn(
  rows: HTableTransformedRowDataType[],
  field: string,
): HTableDataPrimitive[] | undefined {
  const values = new Array<HTableDataPrimitive>(rows.length);
  for (let index = 0; index < rows.length; index++) {
    const value = get(rows[index], field);
    if (!isStrictPrimitive(value)) return undefined;
    values[index] = value;
  }
  return values;
}

function mapStringColumn(rows: HTableTransformedRowDataType[], field: string) {
  return rows.map(row => String(get(row, field) ?? ''));
}

function mapSortColumn(rows: HTableTransformedRowDataType[], field: string) {
  return rows.map(row => {
    const value = get(row, field);
    return typeof value === 'number' ? value : String(value ?? '');
  });
}

function buildWorkerInput(
  rows: HTableTransformedRowDataType[],
  filters: HTableColumnData[],
  sorts: Array<[HTableColumnData, HTableSortOrderEnum]>,
): HTableDataProcessingInput | undefined {
  const projectionColumns: Record<string, HTableDataPrimitiveColumn> = {};
  const projection: HTableDataProcessingInput['projection'] = {
    rowCount: rows.length,
    columns: projectionColumns,
  };
  const workerFilters: HTableDataFilter[] = [];
  const workerSorts: HTableDataSort[] = [];

  for (let index = 0; index < filters.length; index++) {
    const column = filters[index];
    const field = column.props.field;
    const value = column[HTableColumnFilterKey].currentFilterValue.value;
    if (!field || column.props.filterMethod) return undefined;

    const key = `filter:${index}`;
    switch (column.props.filterType) {
      case 'input':
      case 'input-number':
        projectionColumns[key] = mapStringColumn(rows, field);
        workerFilters.push({ column: key, operator: 'contains', value: String(value) });
        break;
      case 'select':
      case 'tree-select':
      case 'cascader': {
        const values = Array.isArray(value) ? value : [value];
        const multiple = (column.props.filterOptions as { multiple?: boolean } | undefined)
          ?.multiple;
        if (multiple === false) {
          projectionColumns[key] = mapStringColumn(rows, field);
          workerFilters.push({ column: key, operator: 'equals', value: String(values[0] ?? '') });
        } else {
          if (!values.every(isStrictPrimitive)) return undefined;
          const projected = mapStrictPrimitiveColumn(rows, field);
          if (!projected) return undefined;
          projectionColumns[key] = projected;
          workerFilters.push({ column: key, operator: 'in', values });
        }
        break;
      }
      default:
        return undefined;
    }
  }

  for (let index = 0; index < sorts.length; index++) {
    const [column, order] = sorts[index];
    const field = column.props.field;
    if (!field || column.props.sortMethod || column.props.sortBy) return undefined;

    const key = `sort:${index}`;
    projectionColumns[key] = mapSortColumn(rows, field);
    workerSorts.push({
      column: key,
      direction: order === HTableSortOrderEnum.ASC ? 'asc' : 'desc',
      numeric: true,
    });
  }

  return {
    projection,
    filters: workerFilters,
    sorts: workerSorts,
  };
}

/**
 * 统一执行 Table 的平面数据过滤与排序，并在适合时将纯数据计划交给 Worker。
 * @en Runs flat-table filtering and sorting through one pipeline and delegates pure plans to a Worker when suitable.
 */
export default function useDataProcessing(options: HTableDataProcessingHookOptions) {
  const processedRows = shallowRef(options.rows.value);
  const processingState = shallowRef<HTableDataProcessingState>({
    revision: 0,
    status: 'idle',
    requestedMode: normalizeOptions(options.props.dataProcessing).mode,
    mode: 'sync',
    rowCount: options.rows.value.length,
    resultRowCount: options.rows.value.length,
    duration: 0,
  });
  let latestRevision = 0;
  let scheduledTimer: ReturnType<typeof setTimeout> | undefined;
  let activeAbortController: AbortController | undefined;
  let activeExecutor: HTableDataProcessingExecutor | undefined;
  let activeExecutorWorkerFactory: HTableDataWorkerFactory | undefined;
  let disposed = false;

  const normalizedOptions = computed(() => normalizeOptions(options.props.dataProcessing));

  const querySnapshot = computed(() => ({
    filters: options.columns.value.flattenColumns.map(column => {
      // Functions and option objects are commonly passed inline in TSX/templates. Reading their
      // identity reactively would schedule a fresh query after every Table render.
      const rawProps = toRaw(column.props);
      const filterOptions = rawProps.filterOptions as
        | { multiple?: boolean; type?: string; isRange?: boolean }
        | undefined;
      return {
        uuid: column.uuid,
        value: column[HTableColumnFilterKey].currentFilterValue.value,
        field: column.props.field,
        filterType: column.props.filterType,
        filterMultiple: filterOptions?.multiple,
        filterDateType: filterOptions?.type,
        filterIsRange: filterOptions?.isRange,
        hasFilterMethod: typeof rawProps.filterMethod === 'function',
        useBuiltInFilter: column.props.useBuiltInFilter,
        configurationRevision: getColumnRuntime(column).filter.configurationRevision.value,
      };
    }),
    sorts: Array.from(options.currentSorts.value, ([column, order]) => {
      const rawProps = toRaw(column.props);
      return {
        uuid: column.uuid,
        order,
        field: column.props.field,
        hasSortMethod: typeof rawProps.sortMethod === 'function',
        hasSortBy: typeof rawProps.sortBy === 'function',
        sortable: column.props.sortable,
        useBuiltInSort: column.props.useBuiltInSort,
      };
    }),
  }));

  function activeFilters() {
    return options.columns.value.flattenColumns.filter(
      column =>
        column.props.useBuiltInFilter &&
        isTableFilterValueActive(column[HTableColumnFilterKey].currentFilterValue.value),
    );
  }

  function activeSorts() {
    return Array.from(options.currentSorts.value).filter(
      ([column]) => column.props.useBuiltInSort && column.props.sortable !== 'custom',
    );
  }

  function emitState(nextState: HTableDataProcessingState) {
    processingState.value = nextState;
    options.emit('dataProcessingChange', { ...nextState });
  }

  function disposeExecutor() {
    activeExecutor?.dispose();
    activeExecutor = undefined;
    activeExecutorWorkerFactory = undefined;
  }

  function stopActiveTask(disposeIdleExecutor = false) {
    const wasRunning = activeAbortController !== undefined;
    activeAbortController?.abort();
    activeAbortController = undefined;
    // An aborted Worker keeps computing because AbortSignal only cancels caller bookkeeping.
    // Terminate it so a newer request is never queued behind stale work. Idle Workers are reused.
    if (wasRunning || disposeIdleExecutor) disposeExecutor();
  }

  function runSynchronously(
    source: HTableTransformedRowDataType[],
    filters: HTableColumnData[],
    sorts: Array<[HTableColumnData, HTableSortOrderEnum]>,
  ) {
    const predicates = filters.map(column =>
      createTableFilterPredicate(column, column[HTableColumnFilterKey].currentFilterValue.value),
    );
    const filtered = predicates.length
      ? source.filter(row => predicates.every(predicate => predicate(row)))
      : source;
    return sorts.length > 0 ? filtered.toSorted(options.compareRows) : filtered;
  }

  function createCancelledState(revision: number): HTableDataProcessingState {
    return {
      ...processingState.value,
      revision,
      status: 'cancelled',
      requestedMode: normalizedOptions.value.mode,
      rowCount: options.rows.value.length,
      duration: 0,
    };
  }

  async function runProcessing(revision: number): Promise<HTableDataProcessingState> {
    if (disposed || revision !== latestRevision) return createCancelledState(revision);

    const source = options.rows.value;
    const config = normalizedOptions.value;
    const filters = activeFilters();
    const sorts = activeSorts();
    const startedAt = now();
    const disabledReason = options.disabledReason.value;
    const requestedWorker =
      config.mode === 'worker' ||
      (config.mode === 'auto' && source.length >= config.workerThreshold);
    let taskAbortController: AbortController | undefined;
    let attemptedWorker = false;

    emitState({
      revision,
      status: 'processing',
      requestedMode: config.mode,
      mode: requestedWorker ? 'worker' : 'sync',
      rowCount: source.length,
      resultRowCount: processedRows.value.length,
      duration: 0,
    });

    try {
      if (!options.enabled.value) {
        disposeExecutor();
        processedRows.value = source;
        const state: HTableDataProcessingState = {
          revision,
          status: 'ready',
          requestedMode: config.mode,
          mode: 'sync',
          rowCount: source.length,
          resultRowCount: source.length,
          duration: now() - startedAt,
          fallbackReason: config.mode === 'sync' ? undefined : disabledReason,
        };
        if (!disposed && revision === latestRevision) emitState(state);
        return state;
      }

      if (filters.length === 0 && sorts.length === 0) {
        disposeExecutor();
        processedRows.value = source;
        const state: HTableDataProcessingState = {
          revision,
          status: 'ready',
          requestedMode: config.mode,
          mode: 'sync',
          rowCount: source.length,
          resultRowCount: source.length,
          duration: now() - startedAt,
          fallbackReason: config.mode === 'sync' ? undefined : 'no-operation',
        };
        if (!disposed && revision === latestRevision) emitState(state);
        return state;
      }

      let result: HTableTransformedRowDataType[];
      let mode: 'sync' | 'worker' = 'sync';
      let fallbackReason: HTableDataProcessingFallbackReason | undefined;
      const workerInput = requestedWorker ? buildWorkerInput(source, filters, sorts) : undefined;

      if (!requestedWorker || !workerInput) {
        disposeExecutor();
        result = runSynchronously(source, filters, sorts);
        fallbackReason = requestedWorker
          ? 'custom-operation'
          : config.mode === 'auto'
            ? 'below-threshold'
            : undefined;
      } else {
        if (activeExecutor && activeExecutorWorkerFactory !== config.workerFactory) {
          disposeExecutor();
        }
        activeExecutor ??= createTableDataProcessingExecutor({
          mode: 'worker',
          workerFactory: config.workerFactory,
          fallbackToSync: true,
        });
        activeExecutorWorkerFactory = config.workerFactory;
        const executor = activeExecutor;
        taskAbortController = new AbortController();
        activeAbortController = taskAbortController;
        attemptedWorker = true;
        const response = await executor.execute(
          createTableDataProcessingRequest(revision, workerInput),
          { signal: taskAbortController.signal, timeout: config.workerTimeout },
        );
        if (disposed || revision !== latestRevision || response.requestId !== revision) {
          return createCancelledState(revision);
        }

        mode = executor.mode;
        result = Array.from(response.indices, index => source[index]);
        if (mode === 'sync' && executor.fallbackError) {
          fallbackReason =
            executor.fallbackError instanceof HTableDataProcessingWorkerUnavailableError
              ? typeof window === 'undefined'
                ? 'ssr'
                : 'worker-unavailable'
              : 'worker-error';
        }
      }

      const state: HTableDataProcessingState = {
        revision,
        status: 'ready',
        requestedMode: config.mode,
        mode,
        rowCount: source.length,
        resultRowCount: result.length,
        duration: now() - startedAt,
        fallbackReason,
      };
      if (!disposed && revision === latestRevision) {
        processedRows.value = result;
        emitState(state);
      }
      return state;
    } catch (error) {
      if (disposed || revision !== latestRevision) return createCancelledState(revision);
      if (error instanceof Error && error.name === 'AbortError') {
        return createCancelledState(revision);
      }

      if (!attemptedWorker) {
        const state: HTableDataProcessingState = {
          revision,
          status: 'error',
          requestedMode: config.mode,
          mode: 'sync',
          rowCount: source.length,
          resultRowCount: processedRows.value.length,
          duration: now() - startedAt,
        };
        emitState(state);
        return state;
      }

      try {
        disposeExecutor();
        const result = runSynchronously(source, filters, sorts);
        const state: HTableDataProcessingState = {
          revision,
          status: 'ready',
          requestedMode: config.mode,
          mode: 'sync',
          rowCount: source.length,
          resultRowCount: result.length,
          duration: now() - startedAt,
          fallbackReason: 'worker-error',
        };
        processedRows.value = result;
        emitState(state);
        return state;
      } catch {
        const state: HTableDataProcessingState = {
          revision,
          status: 'error',
          requestedMode: config.mode,
          mode: 'sync',
          rowCount: source.length,
          resultRowCount: processedRows.value.length,
          duration: now() - startedAt,
        };
        emitState(state);
        return state;
      }
    } finally {
      if (activeAbortController === taskAbortController) activeAbortController = undefined;
    }
  }

  function scheduleProcessing() {
    clearTimeout(scheduledTimer);
    stopActiveTask();
    const revision = ++latestRevision;
    const config = normalizedOptions.value;
    const shouldDebounce = config.mode !== 'sync' && config.debounce > 0;

    if (shouldDebounce) {
      scheduledTimer = setTimeout(() => {
        scheduledTimer = undefined;
        void runProcessing(revision);
      }, config.debounce);
    } else {
      void runProcessing(revision);
    }
  }

  async function refreshDataProcessing() {
    clearTimeout(scheduledTimer);
    scheduledTimer = undefined;
    stopActiveTask(true);
    const revision = ++latestRevision;
    return runProcessing(revision);
  }

  function cancelDataProcessing() {
    clearTimeout(scheduledTimer);
    scheduledTimer = undefined;
    stopActiveTask(true);
    const revision = ++latestRevision;
    emitState({
      ...processingState.value,
      revision,
      status: 'cancelled',
      duration: 0,
    });
  }

  watch(options.rows, scheduleProcessing);
  watch(querySnapshot, scheduleProcessing, {
    deep: true,
    immediate: true,
  });
  watch(
    [
      () => normalizedOptions.value.mode,
      () => normalizedOptions.value.workerThreshold,
      () => normalizedOptions.value.debounce,
      () => normalizedOptions.value.workerTimeout,
      () => typeof normalizedOptions.value.workerFactory === 'function',
    ],
    (values, oldValues) => {
      if (oldValues && values[4] !== oldValues[4]) stopActiveTask(true);
      scheduleProcessing();
    },
  );
  watch([options.enabled, options.disabledReason], scheduleProcessing);

  onBeforeUnmount(() => {
    disposed = true;
    clearTimeout(scheduledTimer);
    stopActiveTask(true);
  });

  return {
    cancelDataProcessing,
    getDataProcessingState: () => ({ ...processingState.value }),
    processedRows,
    processingState,
    refreshDataProcessing,
  };
}
