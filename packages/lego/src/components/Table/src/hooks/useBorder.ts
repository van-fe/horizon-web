import type { Ref, ToRefs } from 'vue';
import { computed } from 'vue';
import type { TableProps } from '../composables/useProps';
import type { NTableColumnData } from '../utils/types';

export default function useBorder(
  refs: ToRefs<TableProps>,
  columnAnalysis: Ref<{
    columnGroups: NTableColumnData[][];
    flattenColumns: NTableColumnData[];
  }>,
) {
  return {
    border: computed(() =>
      columnAnalysis.value.columnGroups.length > 1
        ? 'full'
        : refs.border.value === false
          ? null
          : refs.border.value === true
            ? 'full'
            : refs.border.value,
    ),
  };
}
