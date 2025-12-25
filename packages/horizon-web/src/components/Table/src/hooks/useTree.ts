import type { ComputedRef, ToRefs } from 'vue';
import { computed, inject, ref } from 'vue';
import type {
  HTableColumnData,
  HTableTransformedRowDataType,
  HTableTreeRowDataType,
} from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';
import type { TableProps } from '../composables/useProps';
import { isFunction, isNil } from '@aurora/utils';
import { warn } from '~/utils/useLog';
import {
  HTableFieldMapFormattedInjectKey,
  HTableSetChildrenByRowKeyValueInjectKey,
} from '../utils/injectKeys';

export function formatTreeFieldMap(
  tableProps: ToRefs<TableProps>,
): ComputedRef<Record<keyof HTableTreeRowDataType, string>> {
  return computed(() => ({
    children: tableProps.fieldMap.value?.children || 'children',
    isLeaf: tableProps.fieldMap.value?.isLeaf || 'children',
  }));
}

export default function (tableProps: TableProps, rowsData: HTableTransformedRowDataType[]) {
  const treeExpandRows = ref(new Set<string>());
  const syncLoadingRows = ref(new Set<string>());

  const setChildrenByRowKey = inject(HTableSetChildrenByRowKeyValueInjectKey)!;
  const fieldMapFormatted = inject(HTableFieldMapFormattedInjectKey)!;

  const isTreeData = computed(() =>
    rowsData.some(
      row => fieldMapFormatted.value.children in row || fieldMapFormatted.value.isLeaf in row,
    ),
  );

  async function toggleTreeExpandRows(rowData: HTableTransformedRowDataType) {
    if (treeExpandRows.value.has(rowData[HTableTransformedRowContextKey].uuid)) {
      collapseRow(rowData);
    } else {
      await expandRow(rowData);
    }
  }

  function collapseRow(rowData: HTableTransformedRowDataType) {
    const currentUuid = rowData[HTableTransformedRowContextKey].uuid;

    treeExpandRows.value.delete(currentUuid);

    const recursionSetChildrenToggleUp = (parentUuid: string) => {
      rowsData
        .filter(row => row[HTableTransformedRowContextKey].parentUuid === parentUuid)
        .forEach(row => {
          const thisUuid = row[HTableTransformedRowContextKey].uuid;
          recursionSetChildrenToggleUp(thisUuid);
          treeExpandRows.value.delete(thisUuid);
        });
    };

    recursionSetChildrenToggleUp(currentUuid);
  }

  async function expandRow(rowData: HTableTransformedRowDataType) {
    const currentUuid = rowData[HTableTransformedRowContextKey].uuid;

    if (
      rowData[fieldMapFormatted.value.isLeaf] === false &&
      !rowData[fieldMapFormatted.value.children]?.length
    ) {
      syncLoadingRows.value.add(currentUuid);
      await dynamicLoad(rowData);
      syncLoadingRows.value.delete(currentUuid);
      treeExpandRows.value.add(currentUuid);
    } else {
      treeExpandRows.value.add(currentUuid);
    }
  }

  async function dynamicLoad(rowData: HTableTransformedRowDataType) {
    if (!isFunction(tableProps.dynamicLoad) || isNil(tableProps.rowKey)) {
      warn('table', `You haven't set dynamicLoad. So it will expand directly.`);
      return;
    } else {
      setChildrenByRowKey(rowData[tableProps.rowKey], await tableProps.dynamicLoad(rowData));
    }
  }

  function expandAll() {
    rowsData.forEach(row => {
      if (isRowCanBeExpand(row)) {
        void expandRow(row);
      }
    });
  }

  function clearTreeExpandRows() {
    treeExpandRows.value.clear();
  }

  function isRowCanBeExpand(rowData: HTableTransformedRowDataType) {
    return (
      (Array.isArray(rowData[fieldMapFormatted.value.children]) &&
        rowData[fieldMapFormatted.value.children].length > 0) ||
      rowData[fieldMapFormatted.value.isLeaf] === false
    );
  }

  function shouldSelectionBeVisible(
    rowData: HTableTransformedRowDataType,
    column: HTableColumnData,
  ) {
    return isRowCanBeExpand(rowData) ? column.props.checkStrictly || column.props.multiple : true;
  }

  return {
    treeExpandRows,
    syncLoadingRows,
    isTreeData,
    expandAll,
    toggleTreeExpandRows,
    clearTreeExpandRows,
    isRowCanBeExpand,
    shouldSelectionBeVisible,
  };
}
