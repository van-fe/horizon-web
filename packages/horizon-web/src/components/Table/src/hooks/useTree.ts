import type { ComputedRef, Ref, ToRefs } from 'vue';
import { computed, inject, ref } from 'vue';
import type {
  HTableColumnData,
  HTableRowKeyType,
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
    isLeaf: tableProps.fieldMap.value?.isLeaf || 'isLeaf',
  }));
}

export default function (tableProps: TableProps, rowsData: Ref<HTableTransformedRowDataType[]>) {
  const treeExpandRows = ref(new Set<HTableRowKeyType>());
  const syncLoadingRows = ref(new Set<HTableRowKeyType>());

  const setChildrenByRowKey = inject(HTableSetChildrenByRowKeyValueInjectKey)!;
  const fieldMapFormatted = inject(HTableFieldMapFormattedInjectKey)!;

  const isTreeData = computed(() =>
    rowsData.value.some(
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

    const recursionSetChildrenToggleUp = (parentUuid: HTableRowKeyType) => {
      rowsData.value
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
      try {
        await dynamicLoad(rowData);
        treeExpandRows.value.add(currentUuid);
      } finally {
        syncLoadingRows.value.delete(currentUuid);
      }
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
    rowsData.value.forEach(row => {
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

  function isTreeRowVisible(rowData: HTableTransformedRowDataType) {
    let parentUuid = rowData[HTableTransformedRowContextKey].parentUuid;

    while (parentUuid !== null) {
      if (!treeExpandRows.value.has(parentUuid)) {
        return false;
      }

      parentUuid =
        rowsData.value.find(row => row[HTableTransformedRowContextKey].uuid === parentUuid)?.[
          HTableTransformedRowContextKey
        ].parentUuid ?? null;
    }

    return true;
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
    isTreeRowVisible,
    shouldSelectionBeVisible,
  };
}
