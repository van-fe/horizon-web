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

  const treeIndex = computed(() => {
    const childrenByParent = new Map<HTableRowKeyType | null, HTableRowKeyType[]>();
    const childrenField = fieldMapFormatted.value.children;
    const isLeafField = fieldMapFormatted.value.isLeaf;
    let hasTreeFields = false;

    for (const row of rowsData.value) {
      const context = row[HTableTransformedRowContextKey];
      const siblings = childrenByParent.get(context.parentUuid) ?? [];
      siblings.push(context.uuid);
      childrenByParent.set(context.parentUuid, siblings);
      hasTreeFields ||= childrenField in row || isLeafField in row;
    }

    return {
      childrenByParent,
      hasTreeFields,
    };
  });

  const isTreeData = computed(() => treeIndex.value.hasTreeFields);

  const treeRowVisibility = computed(() => {
    const visibleByUuid = new Map<HTableRowKeyType, boolean>();

    for (const row of rowsData.value) {
      const { uuid, parentUuid } = row[HTableTransformedRowContextKey];
      const visible =
        parentUuid === null ||
        (treeExpandRows.value.has(parentUuid) && (visibleByUuid.get(parentUuid) ?? true));
      visibleByUuid.set(uuid, visible);
    }

    return visibleByUuid;
  });

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
    const parentUuids = [currentUuid];
    const visited = new Set<HTableRowKeyType>();

    while (parentUuids.length > 0) {
      const parentUuid = parentUuids.pop()!;
      if (visited.has(parentUuid)) continue;
      visited.add(parentUuid);

      for (const childUuid of treeIndex.value.childrenByParent.get(parentUuid) ?? []) {
        treeExpandRows.value.delete(childUuid);
        parentUuids.push(childUuid);
      }
    }
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
    return treeRowVisibility.value.get(rowData[HTableTransformedRowContextKey].uuid) ?? true;
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
