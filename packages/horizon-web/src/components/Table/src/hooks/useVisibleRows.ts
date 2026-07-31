import { computed, type ComputedRef, type Ref } from 'vue';
import type { HTableRowKeyType, HTableTransformedRowDataType } from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';

export interface HTableVisibleRowsOptions {
  flattenData: Ref<HTableTransformedRowDataType[]>;
  isTreeData: ComputedRef<boolean>;
  isTreeRowVisible: (row: HTableTransformedRowDataType) => boolean;
  sortRow: (a: HTableTransformedRowDataType, b: HTableTransformedRowDataType) => number;
}

/**
 * 统一生成表格实际展示的行顺序，供普通渲染和虚拟渲染共同使用。
 * @en Produces the displayed row order shared by regular and virtual rendering.
 */
export default function useVisibleRows(options: HTableVisibleRowsOptions) {
  function sortRows(rows: HTableTransformedRowDataType[]) {
    if (!options.isTreeData.value) {
      return rows.toSorted(options.sortRow);
    }

    const rowsByParent = new Map<HTableRowKeyType | null, HTableTransformedRowDataType[]>();
    const result: HTableTransformedRowDataType[] = [];

    rows.forEach(row => {
      const parentUuid = row[HTableTransformedRowContextKey].parentUuid;
      const siblings = rowsByParent.get(parentUuid) ?? [];
      siblings.push(row);
      rowsByParent.set(parentUuid, siblings);
    });

    const appendRows = (parentUuid: HTableRowKeyType | null) => {
      rowsByParent
        .get(parentUuid)
        ?.toSorted(options.sortRow)
        .forEach(row => {
          result.push(row);
          appendRows(row[HTableTransformedRowContextKey].uuid);
        });
    };

    appendRows(null);
    return result;
  }

  const visibleRows = computed(() =>
    sortRows(
      options.flattenData.value
        .filter(row => Object.values(row[HTableTransformedRowContextKey].visible).every(Boolean))
        .filter(options.isTreeRowVisible),
    ),
  );

  return {
    visibleRows,
  };
}
