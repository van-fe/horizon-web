import type { Ref, SetupContext } from 'vue';
import { computed, markRaw, ref, shallowRef, watch } from 'vue';
import { isBoolean, isDefined } from '@aurora/utils';
import { warn } from '~/utils/useLog';
import Tree from '~/utils/useTree';
import type { BaseTreeData, ExtendTreeData } from '~/utils/useTree/types';
import type {
  HTableInsertedColumnData,
  HTableTransformedRowDataType,
  HTableRowKeyType,
} from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';
import type { TableEmits } from '../composables/useEmits';

interface TableSelectionTreeData extends BaseTreeData {
  value: HTableRowKeyType;
  label: string;
  row: HTableTransformedRowDataType;
  children: TableSelectionTreeData[];
}

interface TableSelectionTreeNode extends ExtendTreeData<TableSelectionTreeData> {
  row: HTableTransformedRowDataType;
}

export default function useSelection(
  column: HTableInsertedColumnData,
  emit: SetupContext<TableEmits>['emit'],
  rowsData: Ref<HTableTransformedRowDataType[]>,
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
    () => (rowData: HTableTransformedRowDataType, rowIndex: number) =>
      column.props.selectable === true ||
      (typeof column.props.selectable === 'function' && column.props.selectable(rowData, rowIndex)),
  );

  function createSelectionTree(currentRowsData: HTableTransformedRowDataType[]) {
    const treeDataByUuid = new Map<HTableRowKeyType, TableSelectionTreeData>();
    const roots: TableSelectionTreeData[] = [];

    for (const row of currentRowsData) {
      const uuid = row[HTableTransformedRowContextKey].uuid;

      treeDataByUuid.set(uuid, {
        value: uuid,
        label: String(uuid),
        row,
        children: [],
      });
    }

    for (const row of currentRowsData) {
      const context = row[HTableTransformedRowContextKey];
      const current = treeDataByUuid.get(context.uuid)!;
      const parent =
        context.parentUuid === null ? undefined : treeDataByUuid.get(context.parentUuid);

      if (parent) {
        parent.children.push(current);
      } else {
        roots.push(current);
      }
    }

    return new Tree<TableSelectionTreeData, TableSelectionTreeNode>(roots, {}, node => node.value);
  }

  const selectionTree = shallowRef<Tree<TableSelectionTreeData, TableSelectionTreeNode>>();

  // Tree mutates its own refs while being constructed. Keep construction outside a computed
  // effect so those mutations cannot invalidate the index and rebuild it for every row lookup.
  watch(
    [
      rowsData,
      () => column.props.type,
      () => column.props.multiple,
      () => column.props.checkStrictly,
    ],
    ([currentRowsData, type, multiple, checkStrictly]) => {
      if (
        type !== 'selection' ||
        !multiple ||
        checkStrictly ||
        !currentRowsData.some(row => row[HTableTransformedRowContextKey].parentUuid !== null)
      ) {
        selectionTree.value = undefined;
        return;
      }

      selectionTree.value = markRaw(createSelectionTree(currentRowsData));
    },
    { immediate: true, flush: 'sync' },
  );

  const isTreeSelectionLinked = computed(() => selectionTree.value !== undefined);

  function getTreeNode(rowData: HTableTransformedRowDataType) {
    return selectionTree.value?.getInfoByValue(rowData[HTableTransformedRowContextKey].uuid);
  }

  function getNodeRow(node: TableSelectionTreeNode) {
    return node.row;
  }

  function isTreeNodeSelectable(node: TableSelectionTreeNode) {
    const row = getNodeRow(node);
    return isSelectable.value(row, row[HTableTransformedRowContextKey].index);
  }

  function getSelectionTargets(node: TableSelectionTreeNode, ignoreSelectable = false) {
    const result: TableSelectionTreeNode[] = [];
    const stack = [node];

    while (stack.length > 0) {
      const current = stack.pop()!;

      if (current.transformedChildren.length === 0) {
        if (ignoreSelectable || isTreeNodeSelectable(current)) {
          result.push(current);
        }
      } else {
        for (let i = current.transformedChildren.length - 1; i >= 0; i--) {
          stack.push(current.transformedChildren[i]);
        }
      }
    }

    return result;
  }

  const effectiveCheckedNodesUuid = computed(() => {
    const result = new Set<HTableRowKeyType>();
    const tree = selectionTree.value;

    if (!tree) return result;

    for (const node of tree.flattenTreeData.value) {
      const row = getNodeRow(node);
      const checkValue = row[column.props.columnKey] as HTableRowKeyType;

      if (!checkedRows.value.has(checkValue)) continue;

      if (node.transformedChildren.length === 0) {
        result.add(node._uuid);
      } else {
        getSelectionTargets(node).forEach(child => result.add(child._uuid));
      }
    }

    return result;
  });

  const linkedCheckboxStatus = computed(() => {
    const tree = selectionTree.value;

    if (!tree) {
      return new Map();
    }

    return tree.getCheckboxStatus(effectiveCheckedNodesUuid.value, false, isTreeNodeSelectable);
  });

  const isRowChecked = computed(() => (rowData: HTableTransformedRowDataType) => {
    if (!isTreeSelectionLinked.value) {
      return (
        isDefined(column.props.columnKey) &&
        checkedRows.value.has(rowData[column.props.columnKey] as HTableRowKeyType)
      );
    }

    const node = getTreeNode(rowData);
    return node ? linkedCheckboxStatus.value.get(node._uuid)?.checked === true : false;
  });

  const isRowIndeterminate = computed(() => (rowData: HTableTransformedRowDataType) => {
    if (!isTreeSelectionLinked.value) return false;

    const node = getTreeNode(rowData);
    return node ? linkedCheckboxStatus.value.get(node._uuid)?.indeterminate === true : false;
  });

  function getSelectableRows(currentRowsData: HTableTransformedRowDataType[]) {
    return currentRowsData.filter((rowData, rowIndex) => {
      if (!isSelectable.value(rowData, rowIndex)) return false;
      if (!isTreeSelectionLinked.value) return true;

      return getTreeNode(rowData)?.transformedChildren.length === 0;
    });
  }

  const isCheckedAll = computed(() => (rowsData: HTableTransformedRowDataType[]) => {
    const selectableRows = getSelectableRows(rowsData);

    return (
      selectableRows.length > 0 && selectableRows.every(rowData => isRowChecked.value(rowData))
    );
  });

  const isIndeterminate = computed(() => (rowsData: HTableTransformedRowDataType[]) => {
    const selectableRows = getSelectableRows(rowsData);

    return (
      !isCheckedAll.value(rowsData) &&
      selectableRows.length > 0 &&
      selectableRows.some(rowData => isRowChecked.value(rowData))
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

  watch(
    [rowsData, () => column.props.reserveSelection],
    ([currentRowsData, shouldReserveSelection]) => {
      if (
        shouldReserveSelection ||
        !isDefined(selectedKeys.value) ||
        !isDefined(column.props.columnKey) ||
        column.props.columnKey === ''
      ) {
        return;
      }

      const currentPageKeys = new Set(
        currentRowsData.map(row => row[column.props.columnKey!] as HTableRowKeyType),
      );
      const currentSelectedKeys = Array.isArray(selectedKeys.value)
        ? selectedKeys.value
        : [selectedKeys.value];
      const nextSelectedKeys = currentSelectedKeys.filter(key => currentPageKeys.has(key));

      if (nextSelectedKeys.length !== currentSelectedKeys.length) {
        emitUpdate(nextSelectedKeys);
      }
    },
    { flush: 'sync' },
  );

  function addSelectionValue(checkedVals: Set<HTableRowKeyType>, checkValue: HTableRowKeyType) {
    if (checkedVals.has(checkValue) || checkedVals.size >= column.props.multipleLimit) {
      return;
    }

    checkedVals.add(checkValue);
  }

  function normalizeLinkedCheckedValues(ignoreSelectable = false) {
    const checkedVals = new Set<HTableRowKeyType>(checkedRows.value as Set<HTableRowKeyType>);
    const tree = selectionTree.value;

    if (!tree) return checkedVals;

    for (const node of tree.flattenTreeData.value) {
      if (node.transformedChildren.length === 0) continue;

      const nodeValue = getNodeRow(node)[column.props.columnKey] as HTableRowKeyType;

      if (!checkedVals.delete(nodeValue)) continue;

      for (const target of getSelectionTargets(node, ignoreSelectable)) {
        addSelectionValue(
          checkedVals,
          getNodeRow(target)[column.props.columnKey] as HTableRowKeyType,
        );
      }
    }

    return checkedVals;
  }

  function setTreeNodeSelection(
    checkedVals: Set<HTableRowKeyType>,
    node: TableSelectionTreeNode,
    selected: boolean,
    ignoreSelectable = false,
  ) {
    for (const target of getSelectionTargets(node, ignoreSelectable)) {
      const checkValue = getNodeRow(target)[column.props.columnKey] as HTableRowKeyType;

      if (selected) {
        addSelectionValue(checkedVals, checkValue);
      } else {
        checkedVals.delete(checkValue);
      }
    }
  }

  function handleSelect(rowData: HTableTransformedRowDataType, rowIndex: number) {
    if (!isDefined(column.props.columnKey) || column.props.columnKey === '') {
      warn('table', `Column hasn't set columnKey.`);
      return;
    }

    if (!isSelectable.value(rowData, rowIndex)) {
      return;
    }

    const checkValue = rowData[column.props.columnKey] as HTableRowKeyType;

    if (column.props.multiple) {
      if (isTreeSelectionLinked.value) {
        const node = getTreeNode(rowData);

        if (!node) return;

        const selected = !isRowChecked.value(rowData);
        const checkedVals = normalizeLinkedCheckedValues();

        setTreeNodeSelection(checkedVals, node, selected);
        emitUpdate([...checkedVals]);
        if (selected) {
          emit('select', rowData);
        } else {
          emit('deselect', rowData);
        }
      } else if (checkedRows.value.has(checkValue)) {
        const curr = new Set(checkedRows.value);
        curr.delete(checkValue);

        emitUpdate([...curr]);
        emit('deselect', rowData);
      } else {
        emitUpdate([...checkedRows.value, checkValue]);
        emit('select', rowData);
      }
    } else {
      if (checkedRows.value.has(checkValue)) {
        emitUpdate([]);
        emit('deselect', rowData);
      } else {
        emitUpdate([checkValue]);
        emit('select', rowData);
      }
    }
  }

  function handleSelectAll(rowsData: HTableTransformedRowDataType[]) {
    if (!isDefined(column.props.columnKey) || column.props.columnKey === '') {
      warn('table', `Column hasn't set columnKey.`);
      return;
    }

    if (column.props.multiple) {
      const checkedVals = normalizeLinkedCheckedValues();
      const selectableRows = getSelectableRows(rowsData);
      const shouldClear =
        isCheckedAll.value(rowsData) ||
        (isIndeterminate.value(rowsData) && !column.props.selectOnIndeterminate);

      for (const rowData of selectableRows) {
        const checkValue = rowData[column.props.columnKey] as HTableRowKeyType;

        if (shouldClear) {
          checkedVals.delete(checkValue);
        } else {
          addSelectionValue(checkedVals, checkValue);
        }
      }

      emitUpdate([...checkedVals]);
      emit('selectAll', [...checkedVals].slice(0, column.props.multipleLimit));
    }
  }

  function handleClear(rowsData: HTableTransformedRowDataType[], ignoreSelectable = false) {
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

  function getSelectionRows(rowsData: HTableTransformedRowDataType[]) {
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
    rowsData: HTableTransformedRowDataType[],
    rowKey: HTableRowKeyType | HTableRowKeyType[],
    selected?: boolean,
    ignoreSelectable: boolean = false,
  ) {
    if (!isDefined(column.props.columnKey) || column.props.columnKey === '') {
      warn('table', `Column hasn't set columnKey.`);
      return;
    }

    const checkedVals = isTreeSelectionLinked.value
      ? normalizeLinkedCheckedValues(ignoreSelectable)
      : new Set<HTableRowKeyType>(checkedRows.value as Set<HTableRowKeyType>);
    const rowKeys = new Set(Array.isArray(rowKey) ? rowKey : [rowKey]);

    if (column.props.multiple) {
      for (let i = 0; i < rowsData.length; i++) {
        const row = rowsData[i];
        const checkValue = row[column.props.columnKey] as HTableRowKeyType;

        if (!rowKeys.has(checkValue) || (!ignoreSelectable && !isSelectable.value(row, i)))
          continue;

        if (isTreeSelectionLinked.value) {
          const node = getTreeNode(row);

          if (!node) continue;

          const targets = getSelectionTargets(node, ignoreSelectable);
          const isChecked =
            targets.length > 0 &&
            targets.every(target =>
              checkedVals.has(getNodeRow(target)[column.props.columnKey] as HTableRowKeyType),
            );

          setTreeNodeSelection(
            checkedVals,
            node,
            isBoolean(selected) ? selected : !isChecked,
            ignoreSelectable,
          );
        } else if (isBoolean(selected)) {
          if (selected) {
            addSelectionValue(checkedVals, checkValue);
          } else {
            checkedVals.delete(checkValue);
          }
        } else {
          if (checkedVals.has(checkValue)) {
            checkedVals.delete(checkValue);
          } else {
            addSelectionValue(checkedVals, checkValue);
          }
        }
      }
    } else {
      const row = rowsData.find(row =>
        rowKeys.has(row[column.props.columnKey!] as string | number),
      );

      if (
        row &&
        (ignoreSelectable || (!ignoreSelectable && isSelectable.value(row, rowsData.indexOf(row))))
      ) {
        const checkValue = row[column.props.columnKey] as string | number;

        if (selected === false || (!isBoolean(selected) && checkedVals.has(checkValue))) {
          checkedVals.clear();
        } else {
          checkedVals.clear();
          checkedVals.add(checkValue);
        }
      }
    }

    emitUpdate([...checkedVals]);
  }

  return {
    selectedKeys,
    checkedRows,
    isSelectable,
    isRowChecked,
    isRowIndeterminate,
    isCheckedAll,
    isIndeterminate,
    handleSelect,
    handleSelectAll,
    handleClear,
    getSelectionRows,
    toggleRowSelection,
  };
}
