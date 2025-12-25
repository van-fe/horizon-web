import type { Ref } from 'vue';
import type { HTableColumnData } from '../utils/types';

export default function useHeaderDraggable(
  columnAnalysis: Ref<{
    columnGroups: HTableColumnData[][];
    flattenColumns: HTableColumnData[];
  }>,
) {
  return {
    //
  };
}
