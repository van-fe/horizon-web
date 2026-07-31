import type { CSSProperties, Ref, SetupContext } from 'vue';
import { computed, inject, provide, ref, shallowReactive } from 'vue';
import {
  HTableColumnDecreaseCollectionInjectKey,
  HTableColumnIncreaseCollectionInjectKey,
  HTableGetLastFixedLeftColumnInjectKey,
  HTableGetLastFixedRightColumnInjectKey,
  HTableIsColumnsHaveFixedInjectKey,
} from '../utils/injectKeys';
import { cssVariable, sizeUnitTransform } from '@aurora/utils';
import useSelection from './useSelection';
import type { TableEmits } from '../composables/useEmits';
import type {
  HTableColumnData,
  HTableInsertedColumnData,
  HTableRowKeyType,
  HTableTransformedRowDataType,
} from '../utils/types';
import {
  HTableColumnContextKey,
  HTableColumnFilterKey,
  HTableColumnSelectionKey,
} from '../utils/types';
import useFilter from './useFilter';
import useColumnFixed, { sortColumnsMethod } from './useColumnFixed';
import useColumnVisible from './useColumnVisible';
import useColumnSort from './useColumnSort';

function getColumnWidthStyle(column: HTableInsertedColumnData) {
  switch (column.props.type) {
    default:
    case 'default':
    case 'index':
    case 'expand':
    case 'selection':
      return {
        width: sizeUnitTransform(column.props.width),
        minWidth: sizeUnitTransform(column.props.minWidth),
      };
    case 'drag':
      return {
        width: sizeUnitTransform(column.props.width ?? 40),
        minWidth: sizeUnitTransform(column.props.minWidth ?? 40),
      };
  }
}

function getColumnOverflowTooltipStyle(column: HTableInsertedColumnData): CSSProperties {
  switch (column.props.type) {
    default:
    case 'default':
    case 'index':
    case 'expand':
    case 'selection':
      return {
        width: column.props.width
          ? `calc(${sizeUnitTransform(column.props.width)} - ${cssVariable('table', 'spacing', 'padding', 'cell', 'x')} * 2 - var(--table-border-width))`
          : undefined,
        minWidth: column.props.minWidth
          ? `calc(${sizeUnitTransform(column.props.minWidth)} - ${cssVariable('table', 'spacing', 'padding', 'cell', 'x')} * 2 - var(--table-border-width))`
          : undefined,
      };
    case 'drag':
      return {};
  }
}

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
  flattenData: Ref<HTableTransformedRowDataType[]>,
  emit: SetupContext<TableEmits>['emit'],
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
          const calcChildren: HTableColumnData[] = [];

          const {
            checkedRows,
            isSelectable,
            isCheckedAll,
            isIndeterminate,
            handleSelect,
            handleSelectAll,
            handleClear,
            getSelectionRows,
            toggleRowSelection,
          } = useSelection(column, emit);

          const { currentFilterValue } = useFilter(column, emit, flattenData);

          const currentColumn: HTableColumnData = {
            ...column,
            headerColSpan: 1,
            headerRowSpan: 1,
            calcChildren,
            index: -1,
            // Widths are measured after render; keep the layout context reactive so sticky
            // offsets and resized column styles are applied without another parent render.
            [HTableColumnContextKey]: shallowReactive({
              sizeStyle: getColumnWidthStyle(column),
              resizeWidth: -1,
              isResizing: false,
              overflowStyle: getColumnOverflowTooltipStyle(column),
              prevColumnsWidthSum: 0,
              nextColumnsWidthSum: 0,
              prevColumn: undefined,
              nextColumn: undefined,
              selfElement: ref<HTMLTableCellElement>(),
              parentColumn: parent,
              parentColumnsHeightSum: 0,
              childrenEachRowColumnsHeightSum: 0,
            }),
            [HTableColumnSelectionKey]: {
              checkedRows: checkedRows.value,
              isSelectable,
              isCheckedAll,
              isIndeterminate,
              handleSelect,
              handleSelectAll: () => handleSelectAll(flattenData.value),
              handleClear: (ignoreSelectable: boolean) =>
                handleClear(flattenData.value, ignoreSelectable),
              getSelectionRows: () => getSelectionRows(flattenData.value),
              toggleRowSelection: (
                rowKey: HTableRowKeyType | HTableRowKeyType[],
                selected?: boolean,
                ignoreSelectable?: boolean,
              ) => toggleRowSelection(flattenData.value, rowKey, selected, ignoreSelectable),
            },
            [HTableColumnFilterKey]: {
              currentFilterValue,
            },
          };

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
    currColumns.value = currColumns.value.filter(column => column.uuid !== uuid);
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
