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
  function isFilterVisible(row: HTableTransformedRowDataType) {
    const visible = row[HTableTransformedRowContextKey].visible as unknown as Record<
      string,
      boolean
    >;

    for (const field in visible) {
      if (!visible[field]) return false;
    }

    return true;
  }

  function sortTreeRows(
    rows: HTableTransformedRowDataType[],
    parentsNeedingSort: Set<HTableRowKeyType | null>,
  ) {
    const rowsByParent = new Map<HTableRowKeyType | null, HTableTransformedRowDataType[]>();
    const result: HTableTransformedRowDataType[] = [];

    for (const row of rows) {
      const parentUuid = row[HTableTransformedRowContextKey].parentUuid;
      const siblings = rowsByParent.get(parentUuid) ?? [];
      siblings.push(row);
      rowsByParent.set(parentUuid, siblings);
    }

    const getSiblings = (parentUuid: HTableRowKeyType | null) => {
      const siblings = rowsByParent.get(parentUuid) ?? [];
      return parentsNeedingSort.has(parentUuid) ? siblings.toSorted(options.sortRow) : siblings;
    };

    const pendingRows = getSiblings(null).toReversed();
    while (pendingRows.length > 0) {
      const row = pendingRows.pop()!;
      result.push(row);

      const children = getSiblings(row[HTableTransformedRowContextKey].uuid);
      for (let index = children.length - 1; index >= 0; index--) {
        pendingRows.push(children[index]);
      }
    }

    return result;
  }

  const visibleRows = computed(() => {
    const source = options.flattenData.value;
    const treeData = options.isTreeData.value;
    const includedTreeRows = treeData ? new Set<HTableRowKeyType>() : undefined;
    const previousSibling = treeData
      ? new Map<HTableRowKeyType | null, HTableTransformedRowDataType>()
      : undefined;
    const parentsNeedingSort = new Set<HTableRowKeyType | null>();
    let previousRow: HTableTransformedRowDataType | undefined;
    let filteredRows: HTableTransformedRowDataType[] | undefined;
    let needsFlatSort = false;

    for (let index = 0; index < source.length; index++) {
      const row = source[index];
      const context = row[HTableTransformedRowContextKey];
      const parentIncluded =
        !treeData || context.parentUuid === null || includedTreeRows!.has(context.parentUuid);
      const visible =
        parentIncluded && isFilterVisible(row) && (!treeData || options.isTreeRowVisible(row));

      if (!visible) {
        filteredRows ??= source.slice(0, index);
        continue;
      }

      if (filteredRows) filteredRows.push(row);

      if (treeData) {
        includedTreeRows!.add(context.uuid);
        const previous = previousSibling!.get(context.parentUuid);
        if (previous && options.sortRow(previous, row) > 0) {
          parentsNeedingSort.add(context.parentUuid);
        }
        previousSibling!.set(context.parentUuid, row);
      } else {
        if (previousRow && !needsFlatSort && options.sortRow(previousRow, row) > 0) {
          needsFlatSort = true;
        }
        previousRow = row;
      }
    }

    const rows = filteredRows ?? source;
    if (treeData) {
      return parentsNeedingSort.size > 0 ? sortTreeRows(rows, parentsNeedingSort) : rows;
    }

    return needsFlatSort ? rows.toSorted(options.sortRow) : rows;
  });

  return {
    visibleRows,
  };
}
