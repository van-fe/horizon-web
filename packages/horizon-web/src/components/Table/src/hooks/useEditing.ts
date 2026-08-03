import { computed, nextTick, ref, type ComputedRef, type SetupContext } from 'vue';
import get from 'lodash/get';
import type { TableProps } from '../composables/useProps';
import type { TableEmits } from '../composables/useEmits';
import type {
  HTableCellEditContext,
  HTableColumnData,
  HTableRowDataType,
  HTableRowKeyType,
  HTableTransformedRowDataType,
  HTableTreeRowDataType,
} from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';
import { isFunction } from '@aurora/utils';
import { warn } from '~/utils/useLog';

interface HTableEditingState {
  row: HTableTransformedRowDataType;
  rowIndex: number;
  rowKey: HTableRowKeyType;
  activeColumn: HTableColumnData;
  columns: HTableColumnData[];
  oldValues: Map<string, unknown>;
  values: Map<string, unknown>;
  pending: boolean;
  error?: unknown;
}

export interface HTableEditingOptions {
  tableProps: TableProps;
  columns: ComputedRef<HTableColumnData[]>;
  fieldMapFormatted: ComputedRef<Record<keyof HTableTreeRowDataType, string>>;
  emit: SetupContext<TableEmits>['emit'];
  focusEditor: () => void;
}

function columnIdentity(column: HTableColumnData) {
  return column.props.columnKey ?? column.props.field ?? column.uuid;
}

function setNestedValue(source: HTableRowDataType, path: string, value: unknown) {
  const segments = path.split('.').filter(Boolean);
  if (!segments.length) return source;

  const result = { ...source };
  let target: Record<string, any> = result;
  let current: Record<string, any> = source;

  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      target[segment] = value;
      return;
    }

    const nextSource = current?.[segment];
    const nextTarget = Array.isArray(nextSource) ? [...nextSource] : { ...(nextSource ?? {}) };
    target[segment] = nextTarget;
    target = nextTarget;
    current = nextSource ?? {};
  });

  return result;
}

/**
 * 管理表格编辑状态、异步拦截、不可变数据回写和失败恢复。
 * @en Manages table editing state, async guards, immutable updates, and failure recovery.
 */
export default function useEditing(options: HTableEditingOptions) {
  const editing = ref<HTableEditingState>();
  let operationId = 0;

  function canEdit(row: HTableTransformedRowDataType, column: HTableColumnData, rowIndex: number) {
    if (!column.props.field || !column.props.editable) return false;
    return isFunction(column.props.editable)
      ? column.props.editable(row, rowIndex)
      : column.props.editable === true;
  }

  function editingColumns(
    row: HTableTransformedRowDataType,
    activeColumn: HTableColumnData,
    rowIndex: number,
  ) {
    return options.tableProps.editMode === 'row'
      ? options.columns.value.filter(column => canEdit(row, column, rowIndex))
      : [activeColumn];
  }

  function createContext(
    state: HTableEditingState,
    column: HTableColumnData,
  ): HTableCellEditContext {
    const key = columnIdentity(column);
    return {
      row: state.row,
      rowIndex: state.rowIndex,
      column,
      value: state.values.get(key),
      oldValue: state.oldValues.get(key),
    };
  }

  async function startEdit(
    row: HTableTransformedRowDataType,
    column: HTableColumnData,
    rowIndex: number,
  ) {
    if (!canEdit(row, column, rowIndex)) return false;
    if (editing.value?.pending) return false;
    if (
      editing.value?.rowKey === row[HTableTransformedRowContextKey].uuid &&
      isEditing(row, column)
    ) {
      return true;
    }

    if (editing.value && !(await commitEdit())) return false;

    const currentOperation = ++operationId;
    const value = get(row, column.props.field!);
    const allowed = await column.props.beforeEdit?.({ row, rowIndex, column, value });
    if (currentOperation !== operationId || allowed === false) return false;

    const columns = editingColumns(row, column, rowIndex);
    const oldValues = new Map<string, unknown>();
    columns.forEach(editColumn => {
      oldValues.set(columnIdentity(editColumn), get(row, editColumn.props.field!));
    });

    editing.value = {
      row,
      rowIndex,
      rowKey: row[HTableTransformedRowContextKey].uuid,
      activeColumn: column,
      columns,
      oldValues,
      values: new Map(oldValues),
      pending: false,
    };
    options.emit('cellEditStart', { row, rowIndex, column, value });
    void nextTick(options.focusEditor);
    return true;
  }

  function isEditing(row: HTableTransformedRowDataType, column: HTableColumnData) {
    const state = editing.value;
    if (!state || state.rowKey !== row[HTableTransformedRowContextKey].uuid) return false;
    return state.columns.some(editColumn => editColumn.uuid === column.uuid);
  }

  function getValue(column: HTableColumnData) {
    return editing.value?.values.get(columnIdentity(column));
  }

  function updateValue(column: HTableColumnData, value: unknown) {
    const state = editing.value;
    if (!state || state.pending) return;
    state.error = undefined;
    state.values.set(columnIdentity(column), value);
  }

  function updateRows(
    rows: HTableRowDataType[],
    rowKey: HTableRowKeyType,
    values: Array<{ field: string; value: unknown }>,
  ): HTableRowDataType[] {
    const rowKeyField = options.tableProps.rowKey!;
    const childrenField = options.fieldMapFormatted.value.children;

    return rows.map(row => {
      if (row[rowKeyField] === rowKey) {
        return values.reduce(
          (updatedRow, item) => setNestedValue(updatedRow, item.field, item.value),
          row,
        );
      }

      if (Array.isArray(row[childrenField])) {
        const nextChildren = updateRows(row[childrenField], rowKey, values);
        if (nextChildren.some((child, index) => child !== row[childrenField][index])) {
          return { ...row, [childrenField]: nextChildren };
        }
      }

      return row;
    });
  }

  async function commitEdit() {
    const state = editing.value;
    if (!state || state.pending) return !state?.pending;
    if (!options.tableProps.rowKey) {
      warn('table', "Editing requires the 'rowKey' prop to update data safely.");
      return false;
    }

    const currentOperation = ++operationId;
    state.pending = true;
    state.error = undefined;

    try {
      for (const column of state.columns) {
        const context = createContext(state, column);
        const allowed = await column.props.beforeCommit?.(context);
        if (currentOperation !== operationId) return false;
        if (allowed === false) {
          state.pending = false;
          return false;
        }
      }

      const nextData = updateRows(
        options.tableProps.data,
        state.rowKey,
        state.columns.map(column => ({
          field: column.props.field!,
          value: state.values.get(columnIdentity(column)),
        })),
      );
      options.emit('update:data', nextData);
      state.columns.forEach(column => options.emit('cellEditCommit', createContext(state, column)));
      editing.value = undefined;
      return true;
    } catch (error) {
      if (currentOperation !== operationId) return false;
      state.pending = false;
      state.error = error;
      options.emit('cellEditError', createContext(state, state.activeColumn), error);
      void nextTick(options.focusEditor);
      return false;
    }
  }

  function cancelEdit() {
    const state = editing.value;
    if (!state || state.pending) return;

    operationId++;
    state.columns.forEach(column => options.emit('cellEditCancel', createContext(state, column)));
    editing.value = undefined;
  }

  const editingRowKey = computed(() => editing.value?.rowKey);

  return {
    canEdit,
    cancelEdit,
    commitEdit,
    editing,
    editingRowKey,
    getValue,
    isEditing,
    startEdit,
    updateValue,
  };
}
