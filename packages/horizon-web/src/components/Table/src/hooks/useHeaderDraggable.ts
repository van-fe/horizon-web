import type { Ref } from 'vue';
import type { NTableColumnData } from '../utils/types';

export default function useHeaderDraggable(
  columnAnalysis: Ref<{
    columnGroups: NTableColumnData[][];
    flattenColumns: NTableColumnData[];
  }>,
) {
  return {
    //
  };
}
