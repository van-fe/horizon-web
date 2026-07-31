import type { Ref, SetupContext } from 'vue';
import { ref, watch } from 'vue';
import type { HTableRowKeyType, HTableTransformedRowDataType } from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';
import type { TableProps } from '../composables/useProps';
import type { TableEmits } from '../composables/useEmits';

export default function useExpand(
  rowsData: Ref<HTableTransformedRowDataType[]>,
  tableProps: TableProps,
  emit: SetupContext<TableEmits>['emit'],
) {
  const expandRows = ref(new Set<HTableRowKeyType>());

  watch(
    () => tableProps.expandRowKeys,
    val => {
      if (val) {
        expandRows.value = new Set(val);
      }
    },
    {
      immediate: true,
    },
  );

  watch(rowsData, val => {
    const currentKeys = new Set(val.map(row => row[HTableTransformedRowContextKey].uuid));

    expandRows.value.forEach(key => {
      if (!currentKeys.has(key)) {
        expandRows.value.delete(key);
      }
    });
  });

  function getRowKey(rowData: HTableTransformedRowDataType) {
    return rowData[HTableTransformedRowContextKey].uuid;
  }

  function isExpanded(rowData: HTableTransformedRowDataType) {
    return expandRows.value.has(getRowKey(rowData));
  }

  function toggleExpandRows(rowData: HTableTransformedRowDataType) {
    const key = getRowKey(rowData);

    if (expandRows.value.has(key)) {
      expandRows.value.delete(key);
    } else {
      expandRows.value.add(key);
    }

    emit('update:expandRowKeys', [...expandRows.value]);
  }

  return {
    expandRows,
    isExpanded,
    toggleExpandRows,
  };
}
