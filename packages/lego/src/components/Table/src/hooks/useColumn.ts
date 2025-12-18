import type { CSSProperties, Ref, SetupContext } from 'vue';
import { computed, inject, provide, ref } from 'vue';
import {
  NTableColumnDecreaseCollectionInjectKey,
  NTableColumnIncreaseCollectionInjectKey,
  NTableGetLastFixedLeftColumnInjectKey,
  NTableGetLastFixedRightColumnInjectKey,
  NTableIsColumnsHaveFixedInjectKey,
} from '../utils/injectKeys';
import { cssVariable, sizeUnitTransform } from '@nio-fe/shared';
import useSelection from './useSelection';
import type { TableEmits } from '../composables/useEmits';
import type {
  NTableColumnData,
  NTableInsertedColumnData,
  NTableRowKeyType,
  NTableTransformedRowDataType,
} from '../utils/types';
import {
  NTableColumnContextKey,
  NTableColumnFilterKey,
  NTableColumnSelectionKey,
} from '../utils/types';
import useFilter from './useFilter';
import useColumnFixed, { sortColumnsMethod } from './useColumnFixed';
import useColumnVisible from './useColumnVisible';

function getColumnWidthStyle(column: NTableInsertedColumnData) {
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
        minWidth: '32px',
      };
  }
}

function getColumnOverflowTooltipStyle(column: NTableInsertedColumnData): CSSProperties {
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

function getWidthStyleForCol(columns: NTableColumnData[]) {
  const colWithStyle: Array<{ column: NTableColumnData; style: CSSProperties }> = [];

  for (let i = columns.length - 1; i >= 0; i--) {
    const sizeStyle = columns[i][NTableColumnContextKey].sizeStyle;

    if (sizeStyle.width || sizeStyle.minWidth || colWithStyle.length) {
      colWithStyle.unshift({
        column: columns[i],
        style: columns[i][NTableColumnContextKey].sizeStyle,
      });
    }
  }

  return colWithStyle;
}

export default function useColumn(
  flattenData: Ref<NTableTransformedRowDataType[]>,
  emit: SetupContext<TableEmits>['emit'],
) {
  const currColumns = ref<NTableInsertedColumnData[]>([]);
  const { fixedStore, getFixedState, resetFixedState } = useColumnFixed(currColumns);
  const { visibleStore, getVisibleState, resetVisibleState } = useColumnVisible(currColumns);

  const analysisColumns = computed(() => {
    const flattenColumns: NTableColumnData[] = [];
    const columnGroups: NTableColumnData[][] = [];

    let index = 0;
    function sortColumns(columns: NTableColumnData[]) {
      const sortedColumns = columns.toSorted(sortColumnsMethod(getFixedState));

      sortedColumns.reduce<undefined | NTableColumnData>((prev, curr) => {
        curr[NTableColumnContextKey].prevColumn = prev;
        return curr;
      }, undefined);

      sortedColumns.reduceRight<undefined | NTableColumnData>((prev, curr) => {
        curr[NTableColumnContextKey].nextColumn = prev;
        return curr;
      }, undefined);

      return sortedColumns;
    }

    const action = (
      current: NTableInsertedColumnData[],
      parent: NTableColumnData | undefined = undefined,
      level = 0,
    ) => {
      const currentRow: NTableColumnData[] = [];
      let headerRowSpan = 1;

      current.forEach((column: NTableInsertedColumnData) => {
        const calcChildren: NTableColumnData[] = [];

        if (!getVisibleState(column.uuid)) {
          return;
        }

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

        const currentColumn: NTableColumnData = {
          ...column,
          headerColSpan: 1,
          headerRowSpan: 1,
          calcChildren,
          index: -1,
          [NTableColumnContextKey]: {
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
          },
          [NTableColumnSelectionKey]: {
            checkedRows: checkedRows.value,
            isSelectable: computed(
              () => (rowIndex: number) => isSelectable.value(flattenData.value, rowIndex),
            ),
            isCheckedAll,
            isIndeterminate,
            handleSelect,
            handleSelectAll: () => handleSelectAll(flattenData.value),
            handleClear: (ignoreSelectable: boolean) =>
              handleClear(flattenData.value, ignoreSelectable),
            getSelectionRows: () => getSelectionRows(flattenData.value),
            toggleRowSelection: (
              rowKey: NTableRowKeyType | NTableRowKeyType[],
              selected?: boolean,
              ignoreSelectable?: boolean,
            ) => toggleRowSelection(flattenData.value, rowKey, selected, ignoreSelectable),
          },
          [NTableColumnFilterKey]: {
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
          headerRowSpan += Math.max(...calcChildren.map(child => child.headerRowSpan));
        } else {
          flattenColumns.push(currentColumn);
          currentColumn.index = index++;
        }

        currentRow.push(currentColumn);
      });

      currentRow.forEach((column: NTableColumnData) => {
        column.headerRowSpan = column.children.length > 0 ? 1 : headerRowSpan;
      });

      if (!Array.isArray(columnGroups[level])) {
        columnGroups[level] = [];
      }

      columnGroups[level].push(...currentRow);

      return currentRow;
    };

    action(currColumns.value as any);

    return {
      columnGroups: columnGroups.map(sortColumns),
      flattenColumns: [flattenColumns].map(sortColumns)[0],
      colStyle: getWidthStyleForCol([flattenColumns].map(sortColumns)[0]),
    };
  });

  const isColumnsHaveFixed = computed(() =>
    analysisColumns.value.flattenColumns.some(column => getFixedState(column.uuid)),
  );

  function getLastFixedLeftColumn(): NTableColumnData | null {
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

  function getLastFixedRightColumn(): NTableColumnData | null {
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

  const increaseChild = inject(NTableColumnIncreaseCollectionInjectKey, undefined);
  const decreaseChild = inject(NTableColumnDecreaseCollectionInjectKey, undefined);

  provide(NTableColumnIncreaseCollectionInjectKey, column => {
    currColumns.value.push(column);
  });

  provide(NTableColumnDecreaseCollectionInjectKey, uuid => {
    currColumns.value = currColumns.value.filter(column => column.uuid !== uuid);
  });

  provide(NTableGetLastFixedLeftColumnInjectKey, getLastFixedLeftColumn);
  provide(NTableGetLastFixedRightColumnInjectKey, getLastFixedRightColumn);
  provide(NTableIsColumnsHaveFixedInjectKey, isColumnsHaveFixed);

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
    getLastFixedLeftColumn,
    getLastFixedRightColumn,
  };
}
