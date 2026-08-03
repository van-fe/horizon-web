import type { CSSProperties, Ref, SetupContext } from 'vue';
import { computed, inject, provide, ref } from 'vue';
import {
  HTableColumnDecreaseCollectionInjectKey,
  HTableColumnIncreaseCollectionInjectKey,
  HTableGetLastFixedLeftColumnInjectKey,
  HTableGetLastFixedRightColumnInjectKey,
  HTableIsColumnsHaveFixedInjectKey,
} from '../utils/injectKeys';
import type { TableEmits } from '../composables/useEmits';
import type {
  HTableColumnData,
  HTableInsertedColumnData,
  HTableTransformedRowDataType,
} from '../utils/types';
import { HTableColumnContextKey } from '../utils/types';
import useColumnFixed, { sortColumnsMethod } from './useColumnFixed';
import useColumnVisible from './useColumnVisible';
import useColumnSort from './useColumnSort';
import { getColumnRuntime } from './useColumnRuntime';

function getWidthStyleForCol(columns: HTableColumnData[]) {
  const colWithStyle: Array<{ column: HTableColumnData; style: CSSProperties }> = [];

  for (let i = columns.length - 1; i >= 0; i--) {
    const sizeStyle = columns[i][HTableColumnContextKey].sizeStyle;

    if (sizeStyle.width || sizeStyle.minWidth || colWithStyle.length) {
      colWithStyle.unshift({
        column: columns[i],
        style: columns[i][HTableColumnContextKey].sizeStyle,
      });
    }
  }

  return colWithStyle;
}

export default function useColumn(
  _flattenData: Ref<HTableTransformedRowDataType[]>,
  _emit: SetupContext<TableEmits>['emit'],
  _useBuiltInDataOperations: () => boolean = () => true,
) {
  const currColumns = ref<HTableInsertedColumnData[]>([]);
  const { fixedStore, getFixedState, resetFixedState } = useColumnFixed(currColumns);
  const { visibleStore, getVisibleState, resetVisibleState } = useColumnVisible(currColumns);
  const { sortStore, getSortState, resetSortState } = useColumnSort(currColumns);

  const analysisColumns = computed(() => {
    const flattenColumns: HTableColumnData[] = [];
    const columnGroups: HTableColumnData[][] = [];

    let index = 0;
    function sortColumns<T extends HTableInsertedColumnData>(columns: T[]) {
      const sourceIndexes = new Map(columns.map((column, index) => [column.uuid, index]));
      const fixedSort = sortColumnsMethod(getFixedState);
      return columns.toSorted((a, b) => {
        const fixedResult = fixedSort(a, b);

        if (fixedResult !== 0) {
          return fixedResult;
        }

        return (
          (getSortState(a.uuid) ?? sourceIndexes.get(a.uuid) ?? 0) -
          (getSortState(b.uuid) ?? sourceIndexes.get(b.uuid) ?? 0)
        );
      });
    }

    function linkColumns(columns: HTableColumnData[]) {
      columns.reduce<undefined | HTableColumnData>((prev, curr) => {
        curr[HTableColumnContextKey].prevColumn = prev;
        return curr;
      }, undefined);

      columns.reduceRight<undefined | HTableColumnData>((prev, curr) => {
        curr[HTableColumnContextKey].nextColumn = prev;
        return curr;
      }, undefined);
    }

    const action = (
      current: HTableInsertedColumnData[],
      parent: HTableColumnData | undefined = undefined,
      level = 0,
    ) => {
      const currentRow: HTableColumnData[] = [];

      sortColumns(current.filter(column => getVisibleState(column.uuid))).forEach(
        (column: HTableInsertedColumnData) => {
          const currentColumn = getColumnRuntime(column).column;
          const calcChildren = currentColumn.calcChildren;

          currentColumn.headerColSpan = 1;
          currentColumn.headerRowSpan = 1;
          currentColumn.index = -1;
          currentColumn[HTableColumnContextKey].parentColumn = parent;
          calcChildren.splice(0, calcChildren.length);

          if (column.children.length > 0) {
            calcChildren.splice(
              0,
              calcChildren.length,
              ...action(column.children, currentColumn, level + 1),
            );

            currentColumn.headerColSpan = calcChildren.reduce(
              (prev, curr) => prev + curr.headerColSpan,
              0,
            );

            if (calcChildren.length === 0) {
              return;
            }
          } else {
            flattenColumns.push(currentColumn);
            currentColumn.index = index++;
          }

          currentRow.push(currentColumn);
        },
      );

      if (currentRow.length > 0) {
        if (!Array.isArray(columnGroups[level])) {
          columnGroups[level] = [];
        }

        columnGroups[level].push(...currentRow);
      }

      return currentRow;
    };

    action(currColumns.value);

    const headerRowAmount = columnGroups.length;

    columnGroups.forEach((columns, level) => {
      columns.forEach(column => {
        column.headerRowSpan = column.calcChildren.length > 0 ? 1 : headerRowAmount - level;
      });
      linkColumns(columns);
    });
    linkColumns(flattenColumns);

    return {
      columnGroups,
      flattenColumns,
      colStyle: getWidthStyleForCol(flattenColumns),
    };
  });

  const isColumnsHaveFixed = computed(() =>
    analysisColumns.value.flattenColumns.some(column => getFixedState(column.uuid)),
  );

  function getLastFixedLeftColumn(): HTableColumnData | null {
    let res = null;

    const list = analysisColumns.value.flattenColumns;

    if (list.length === 0) {
      return res;
    } else if (list.length === 1) {
      res = getFixedState(list[0].uuid) === 'left' ? list[0] : null;
    } else {
      for (let i = 0; i < list.length; i++) {
        if (getFixedState(list[i].uuid) === 'left') {
          res = list[i];
        }
      }
    }

    return res;
  }

  function getLastFixedRightColumn(): HTableColumnData | null {
    let res = null;

    const list = analysisColumns.value.flattenColumns.toReversed();

    if (list.length === 0) {
      return res;
    } else if (list.length === 1) {
      res = getFixedState(list[0].uuid) === 'right' ? list[0] : null;
    } else {
      for (let i = 0; i < list.length; i++) {
        if (getFixedState(list[i].uuid) === 'right') {
          res = list[i];
        }
      }
    }

    return res;
  }

  const increaseChild = inject(HTableColumnIncreaseCollectionInjectKey, undefined);
  const decreaseChild = inject(HTableColumnDecreaseCollectionInjectKey, undefined);

  provide(HTableColumnIncreaseCollectionInjectKey, column => {
    currColumns.value.push(column);
  });

  provide(HTableColumnDecreaseCollectionInjectKey, uuid => {
    const index = currColumns.value.findIndex(column => column.uuid === uuid);
    if (index >= 0) currColumns.value.splice(index, 1);
  });

  provide(HTableGetLastFixedLeftColumnInjectKey, getLastFixedLeftColumn);
  provide(HTableGetLastFixedRightColumnInjectKey, getLastFixedRightColumn);
  provide(HTableIsColumnsHaveFixedInjectKey, isColumnsHaveFixed);

  return {
    columns: currColumns,
    increaseChild,
    decreaseChild,
    analysisColumns,
    isColumnsHaveFixed,
    fixedStore,
    getFixedState,
    resetFixedState,
    visibleStore,
    getVisibleState,
    resetVisibleState,
    sortStore,
    getSortState,
    resetSortState,
    getLastFixedLeftColumn,
    getLastFixedRightColumn,
  };
}
