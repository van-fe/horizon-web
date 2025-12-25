import type { HTableTransformedRowDataType } from '../utils/types';
import { ref, watch } from 'vue';

export default function useExpand(rowsData: HTableTransformedRowDataType[]) {
  const expandRows = ref(new Map<HTableTransformedRowDataType, boolean>());

  watch(rowsData, val => {
    val.forEach(row => {
      expandRows.value.set(row, false);
    });
  });

  function toggleExpandRows(rowData: HTableTransformedRowDataType) {
    expandRows.value.set(rowData, !expandRows.value.get(rowData));
  }

  return {
    expandRows,
    toggleExpandRows,
  };
}
