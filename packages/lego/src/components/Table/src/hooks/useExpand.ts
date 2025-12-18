import type { NTableTransformedRowDataType } from '../utils/types';
import { ref, watch } from 'vue';

export default function useExpand(rowsData: NTableTransformedRowDataType[]) {
  const expandRows = ref(new Map<NTableTransformedRowDataType, boolean>());

  watch(rowsData, val => {
    val.forEach(row => {
      expandRows.value.set(row, false);
    });
  });

  function toggleExpandRows(rowData: NTableTransformedRowDataType) {
    expandRows.value.set(rowData, !expandRows.value.get(rowData));
  }

  return {
    expandRows,
    toggleExpandRows,
  };
}
