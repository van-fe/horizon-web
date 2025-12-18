import type { SetupContext } from 'vue';
import { computed, ref, watch } from 'vue';
import { isBoolean, isDefined } from '@aurora/utils';
import { warn } from '~/utils/useLog';
import type {
  NTableInsertedColumnData,
  NTableTransformedRowDataType,
  NTableRowKeyType,
} from '../utils/types';
import type { TableEmits } from '../composables/useEmits';

export default function useSelection(
  column: NTableInsertedColumnData,
  emit: SetupContext<TableEmits>['emit'],
) {
  const selectedKeys = ref(column.props.selectedKeys);

  const checkedRows = computed(
    () =>
      new Set(
        isDefined(selectedKeys.value)
          ? Array.isArray(selectedKeys.value)
            ? selectedKeys.value
            : [selectedKeys.value]
          : null,
      ),
  );

  const isSelectable = computed(
    () => (rowData: NTableTransformedRowDataType, rowIndex: number) =>
      column.props.selectable === true ||
      (typeof column.props.selectable === 'function' && column.props.selectable(rowData, rowIndex)),
  );

  const isCheckedAll = computed(() => (rowsData: NTableTransformedRowDataType[]) => {
    return (
      rowsData.length > 0 &&
      rowsData.every(
        rowData =>
          column.props.columnKey &&
          checkedRows.value.has(rowData[column.props.columnKey] as string | number),
      )
    );
  });

  const isIndeterminate = computed(() => (rowsData: NTableTransformedRowDataType[]) => {
    return (
      !isCheckedAll.value(rowsData) &&
      rowsData.length > 0 &&
      checkedRows.value.size > 0 &&
      rowsData.some(
        rowData =>
          column.props.columnKey &&
          checkedRows.value.has(rowData[column.props.columnKey] as string | number),
      )
    );
  });

  watch(
    () => column.props.selectedKeys,
    val => {
      selectedKeys.value = val;
    },
  );

  function emitUpdate<T>(val: T[]) {
    column.emit(
      'update:selectedKeys',
      column.props.multiple ? val.slice(0, column.props.multipleLimit) : val[0],
    );
  }

  function handleSelect(rowData: NTableTransformedRowDataType, rowIndex: number) {
    if (!isDefined(column.props.columnKey) || column.props.columnKey === '') {
      warn('table', `Column hasn't set columnKey.`);
      return;
    }

    if (!isSelectable.value(rowData, rowIndex)) {
      return;
    }

    const checkValue = rowData[column.props.columnKey] as string | number;

    if (column.props.multiple) {
      if (checkedRows.value.has(checkValue)) {
        const curr = new Set(checkedRows.value);
        curr.delete(checkValue);

        emitUpdate([...curr]);
      } else {
        emitUpdate([...checkedRows.value, checkValue]);
      }
    } else {
      emitUpdate([checkValue]);
    }
  }

  function handleSelectAll(rowsData: NTableTransformedRowDataType[]) {
    if (!isDefined(column.props.columnKey) || column.props.columnKey === '') {
      warn('table', `Column hasn't set columnKey.`);
      return;
    }

    if (column.props.multiple) {
      const checkedVals = new Set(checkedRows.value);

      if (isCheckedAll.value(rowsData)) {
        for (let i = 0; i < rowsData.length; i++) {
          const rowData = rowsData[i];
          const checkValue = rowData[column.props.columnKey] as string | number;

          if (checkedVals.has(checkValue) && isSelectable.value(rowData, i)) {
            checkedVals.delete(checkValue);
          }
        }

        emitUpdate([...checkedVals]);
      } else {
        for (let i = 0; i < rowsData.length; i++) {
          const rowData = rowsData[i];
          const checkValue = rowData[column.props.columnKey] as string | number;

          if (!checkedVals.has(checkValue) && isSelectable.value(rowData, i)) {
            checkedVals.add(checkValue);
          }
        }

        emitUpdate([...checkedVals]);
      }

      emit('selectAll', [...checkedVals]);
    }
  }

  function handleClear(rowsData: NTableTransformedRowDataType[], ignoreSelectable = false) {
    if (ignoreSelectable) {
      emitUpdate([]);
    } else {
      if (!isDefined(column.props.columnKey) || column.props.columnKey === '') {
        warn('table', `Column hasn't set columnKey.`);
        return;
      }

      const checkedVals = new Set(checkedRows.value);

      for (let i = 0; i < rowsData.length; i++) {
        const rowData = rowsData[i];
        const checkValue = rowData[column.props.columnKey] as string | number;

        if (checkedVals.has(checkValue) && isSelectable.value(rowData, i)) {
          checkedVals.delete(checkValue);
        }
      }

      emitUpdate([...checkedVals]);
    }
  }

  function getSelectionRows(rowsData: NTableTransformedRowDataType[]) {
    if (!isDefined(column.props.columnKey) || column.props.columnKey === '') {
      warn('table', `Column hasn't set columnKey.`);
      return [];
    }

    return rowsData.filter(row => {
      const checkValue = row[column.props.columnKey!] as string | number;

      return checkedRows.value.has(checkValue);
    });
  }

  function toggleRowSelection(
    rowsData: NTableTransformedRowDataType[],
    rowKey: NTableRowKeyType | NTableRowKeyType[],
    selected?: boolean,
    ignoreSelectable: boolean = false,
  ) {
    if (!isDefined(column.props.columnKey) || column.props.columnKey === '') {
      warn('table', `Column hasn't set columnKey.`);
      return;
    }

    const checkedVals = new Set(checkedRows.value);

    if (column.props.multiple) {
      for (let i = 0; i < rowsData.length; i++) {
        const row = rowsData[i];
        const checkValue = row[column.props.columnKey] as string | number;

        if (
          !(rowKey as Array<NTableRowKeyType>).includes(checkValue) ||
          (!ignoreSelectable && !isSelectable.value(row, i))
        )
          continue;

        if (isBoolean(selected)) {
          if (selected) {
            checkedVals.add(checkValue);
          } else {
            checkedVals.delete(checkValue);
          }
        } else {
          if (checkedVals.has(checkValue)) {
            checkedVals.delete(checkValue);
          } else {
            checkedVals.add(checkValue);
          }
        }
      }
    } else {
      const row = rowsData.find(
        row => (row[column.props.columnKey!] as string | number) === rowKey,
      );

      if (
        row &&
        (ignoreSelectable || (!ignoreSelectable && isSelectable.value(row, rowsData.indexOf(row))))
      ) {
        if (checkedVals.has(row[column.props.columnKey])) {
          checkedVals.clear();
        } else {
          checkedVals.clear();
          checkedVals.add(row[column.props.columnKey]);
        }
      }
    }

    emitUpdate([...checkedVals]);
  }

  return {
    selectedKeys,
    checkedRows,
    isSelectable,
    isCheckedAll,
    isIndeterminate,
    handleSelect,
    handleSelectAll,
    handleClear,
    getSelectionRows,
    toggleRowSelection,
  };
}
