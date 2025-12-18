import type { CSSProperties, Ref } from 'vue';
import { provide, ref } from 'vue';
import type { TableColumnProps } from '../composables/useProps';
import type { NTableColumnData, NTableFixedValue } from '../utils/types';
import { NTableColumnContextKey } from '../utils/types';
import {
  NTableRefreshLayoutInjectKey,
  NTableScrollbarTrackSpacingInjectKey,
} from '../utils/injectKeys';
import type { LegoComponentInstance } from '@nio-fe/shared';
import { sizeUnitTransform } from '@nio-fe/shared';
import type TableFooter from '../components/TableFooter';

export function formatFixed(fixedValue: TableColumnProps['fixed'] | undefined) {
  return fixedValue === true || fixedValue === 'left'
    ? 'left'
    : fixedValue === false
      ? undefined
      : fixedValue;
}

export default function useLayout(
  analysisColumns: Ref<{
    columnGroups: NTableColumnData[][];
    flattenColumns: NTableColumnData[];
  }>,
  getFixedState: (uuid: string) => NTableFixedValue,
) {
  const tableFooterDomRef = ref<LegoComponentInstance<typeof TableFooter>>();
  const footerRowHeight = ref<number[]>([]);

  function calculateColumnsLayout() {
    const calcPrev = (column: NTableColumnData) => {
      column[NTableColumnContextKey].prevColumnsWidthSum =
        (column[NTableColumnContextKey].prevColumn?.[NTableColumnContextKey].prevColumnsWidthSum
          || 0) +
        (column[NTableColumnContextKey].prevColumn?.[
          NTableColumnContextKey
        ].selfElement.value?.getBoundingClientRect().width || 0);
    };

    const calcNext = (column: NTableColumnData) => {
      column[NTableColumnContextKey].nextColumnsWidthSum =
        (column[NTableColumnContextKey].nextColumn?.[NTableColumnContextKey].nextColumnsWidthSum
          || 0) +
        (column[NTableColumnContextKey].nextColumn?.[
          NTableColumnContextKey
        ].selfElement.value?.getBoundingClientRect().width || 0);
    };

    const calcParents = (column: NTableColumnData) => {
      column[NTableColumnContextKey].parentColumnsHeightSum =
        (column[NTableColumnContextKey].parentColumn?.[NTableColumnContextKey]
          .parentColumnsHeightSum || 0) +
        (column[NTableColumnContextKey].parentColumn?.[
          NTableColumnContextKey
        ].selfElement.value?.getBoundingClientRect().height || 0);
    };

    const calcEachRowChildrenHeightSum = (column?: NTableColumnData) => {
      if (!column) return 0;

      const firstChild = column.calcChildren.at(0);

      const result: number =
        (firstChild?.[NTableColumnContextKey].selfElement.value?.clientHeight || 0) +
        calcEachRowChildrenHeightSum(firstChild);

      column[NTableColumnContextKey].childrenEachRowColumnsHeightSum = result;

      return result;
    };

    analysisColumns.value.columnGroups.forEach((row: NTableColumnData[]) => {
      row.forEach(calcPrev);
      row.forEach(calcParents);
      row.toReversed().forEach(calcNext);
    });

    analysisColumns.value.columnGroups.at(0)?.forEach(calcEachRowChildrenHeightSum);

    analysisColumns.value.flattenColumns.forEach(calcPrev);

    analysisColumns.value.flattenColumns.toReversed().forEach(calcNext);
  }

  const scrollbarBeginEndSpacing = ref<[[number, number], [number, number]]>([
    [0, 0],
    [0, 0],
  ]);

  provide(NTableScrollbarTrackSpacingInjectKey, scrollbarBeginEndSpacing);

  function refreshScrollbarSpacing() {
    const lastHeaderCell = analysisColumns.value.columnGroups.at(-1)?.[0]?.[NTableColumnContextKey];

    const lastFixedLeftColumn = analysisColumns.value.flattenColumns.findLast(
      curr => getFixedState(curr.uuid) === 'left',
    );
    const firstFixedRightColumn = analysisColumns.value.flattenColumns.find(
      curr => getFixedState(curr.uuid) === 'right',
    );

    scrollbarBeginEndSpacing.value = [
      [
        (lastHeaderCell?.parentColumnsHeightSum || 0) +
          (lastHeaderCell?.selfElement.value?.clientHeight || 0),
        tableFooterDomRef.value?.$el?.clientHeight || 0,
      ],
      [
        lastFixedLeftColumn
          ? lastFixedLeftColumn[NTableColumnContextKey].prevColumnsWidthSum +
            (lastFixedLeftColumn[NTableColumnContextKey].selfElement.value?.clientWidth ?? 0)
          : 0,
        firstFixedRightColumn
          ? firstFixedRightColumn[NTableColumnContextKey].nextColumnsWidthSum +
            (firstFixedRightColumn[NTableColumnContextKey].selfElement.value?.clientWidth ?? 0)
          : 0,
      ],
    ];
  }

  function refreshFooterHeight() {
    footerRowHeight.value = [0];

    const rows = tableFooterDomRef.value?.$el?.rows ?? [];
    let sum = 0;

    for (let i = rows.length - 1; i > 0; i--) {
      sum += rows[i].clientHeight || 0;
      footerRowHeight.value.unshift(sum);
    }
  }

  function refreshLayout() {
    calculateColumnsLayout();
    refreshFooterHeight();
    refreshScrollbarSpacing();
  }

  provide(NTableRefreshLayoutInjectKey, refreshLayout);

  return {
    tableFooterDomRef,
    footerRowHeight,
    calculateColumnsLayout,
    refreshLayout,
    refreshScrollbarSpacing,
    scrollbarBeginEndSpacing,
  };
}

export function getFixedStyle(
  columnData: NTableColumnData,
  getFixedState: (uuid: string) => NTableFixedValue,
): CSSProperties {
  switch (getFixedState(columnData.uuid)) {
    case 'left':
      return {
        left: columnData[NTableColumnContextKey].prevColumnsWidthSum + 'px',
      };
    case 'right':
      return {
        right: columnData[NTableColumnContextKey].nextColumnsWidthSum + 'px',
      };
    default:
      return {};
  }
}

export function isFirstColumn(columnData: NTableColumnData) {
  return !columnData[NTableColumnContextKey].prevColumn;
}

export function isLastColumn(columnData: NTableColumnData) {
  return !columnData[NTableColumnContextKey].nextColumn;
}

export function isLastFixedColumn(
  columnData: NTableColumnData,
  getFixedState: (uuid: string) => NTableFixedValue,
) {
  switch (getFixedState(columnData.uuid)) {
    case 'left':
      return (
        columnData[NTableColumnContextKey].nextColumn &&
        getFixedState(columnData[NTableColumnContextKey].nextColumn.uuid) !== 'left'
      );
    case 'right':
      return (
        columnData[NTableColumnContextKey].prevColumn &&
        getFixedState(columnData[NTableColumnContextKey].prevColumn.uuid) !== 'right'
      );
    default:
      return false;
  }
}

export function getHeaderStyle(
  columnData: NTableColumnData,
  append?: {
    minWidth?: string;
  },
): CSSProperties {
  return {
    top: columnData[NTableColumnContextKey].parentColumnsHeightSum + 'px',
    minWidth: append?.minWidth
      ? `calc(${sizeUnitTransform(columnData.props.minWidth)} + ${append.minWidth})`
      : sizeUnitTransform(columnData.props.minWidth),
    width:
      columnData[NTableColumnContextKey].resizeWidth > 0
        ? columnData[NTableColumnContextKey].resizeWidth + 'px'
        : undefined,
  };
}

export function getBodyStyle(columnData: NTableColumnData): CSSProperties {
  return {
    minWidth: sizeUnitTransform(columnData.props.minWidth),
    maxWidth:
      columnData[NTableColumnContextKey].resizeWidth > 0
        ? columnData[NTableColumnContextKey].resizeWidth + 'px'
        : undefined,
  };
}

export function getFooterStyle(rowIndex: number, footerRowHeight: Ref<number[]>): CSSProperties {
  return {
    bottom: `${footerRowHeight.value?.[rowIndex] ?? 46}px`,
  };
}
