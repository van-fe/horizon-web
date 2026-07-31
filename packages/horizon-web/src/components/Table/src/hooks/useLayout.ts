import type { CSSProperties, Ref } from 'vue';
import { provide, ref } from 'vue';
import type { TableColumnProps } from '../composables/useProps';
import type { HTableColumnData, HTableFixedValue } from '../utils/types';
import { HTableColumnContextKey } from '../utils/types';
import {
  HTableRefreshLayoutInjectKey,
  HTableScrollbarTrackSpacingInjectKey,
} from '../utils/injectKeys';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import { sizeUnitTransform } from '@aurora/utils';
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
    columnGroups: HTableColumnData[][];
    flattenColumns: HTableColumnData[];
  }>,
  getFixedState: (uuid: string) => HTableFixedValue,
) {
  const tableFooterDomRef = ref<HorizonWebComponentInstance<typeof TableFooter>>();
  const footerRowHeight = ref<number[]>([]);
  const firstHeaderRowHeight = ref(0);

  function calculateColumnsLayout() {
    const calcPrev = (column: HTableColumnData) => {
      column[HTableColumnContextKey].prevColumnsWidthSum =
        (column[HTableColumnContextKey].prevColumn?.[HTableColumnContextKey].prevColumnsWidthSum ||
          0) +
        (column[HTableColumnContextKey].prevColumn?.[
          HTableColumnContextKey
        ].selfElement.value?.getBoundingClientRect().width || 0);
    };

    const calcNext = (column: HTableColumnData) => {
      column[HTableColumnContextKey].nextColumnsWidthSum =
        (column[HTableColumnContextKey].nextColumn?.[HTableColumnContextKey].nextColumnsWidthSum ||
          0) +
        (column[HTableColumnContextKey].nextColumn?.[
          HTableColumnContextKey
        ].selfElement.value?.getBoundingClientRect().width || 0);
    };

    const calcParents = (column: HTableColumnData) => {
      column[HTableColumnContextKey].parentColumnsHeightSum =
        (column[HTableColumnContextKey].parentColumn?.[HTableColumnContextKey]
          .parentColumnsHeightSum || 0) +
        (column[HTableColumnContextKey].parentColumn?.[
          HTableColumnContextKey
        ].selfElement.value?.getBoundingClientRect().height || 0);
    };

    const calcEachRowChildrenHeightSum = (column?: HTableColumnData) => {
      if (!column) return 0;

      const firstChild = column.calcChildren.at(0);

      const result: number =
        (firstChild?.[HTableColumnContextKey].selfElement.value?.clientHeight || 0) +
        calcEachRowChildrenHeightSum(firstChild);

      column[HTableColumnContextKey].childrenEachRowColumnsHeightSum = result;

      return result;
    };

    analysisColumns.value.columnGroups.forEach((row: HTableColumnData[]) => {
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

  provide(HTableScrollbarTrackSpacingInjectKey, scrollbarBeginEndSpacing);

  function refreshScrollbarSpacing() {
    const firstHeaderCell = analysisColumns.value.columnGroups.at(0)?.at(0)?.[
      HTableColumnContextKey
    ];
    const lastHeaderCell = analysisColumns.value.columnGroups.at(-1)?.[0]?.[HTableColumnContextKey];

    const lastFixedLeftColumn = analysisColumns.value.flattenColumns.findLast(
      curr => getFixedState(curr.uuid) === 'left',
    );
    const firstFixedRightColumn = analysisColumns.value.flattenColumns.find(
      curr => getFixedState(curr.uuid) === 'right',
    );

    firstHeaderRowHeight.value =
      firstHeaderCell?.selfElement.value?.parentElement?.clientHeight || 0;
    scrollbarBeginEndSpacing.value = [
      [
        (lastHeaderCell?.parentColumnsHeightSum || 0) +
          (lastHeaderCell?.selfElement.value?.clientHeight || 0),
        tableFooterDomRef.value?.$el?.clientHeight || 0,
      ],
      [
        lastFixedLeftColumn
          ? lastFixedLeftColumn[HTableColumnContextKey].prevColumnsWidthSum +
            (lastFixedLeftColumn[HTableColumnContextKey].selfElement.value?.clientWidth ?? 0)
          : 0,
        firstFixedRightColumn
          ? firstFixedRightColumn[HTableColumnContextKey].nextColumnsWidthSum +
            (firstFixedRightColumn[HTableColumnContextKey].selfElement.value?.clientWidth ?? 0)
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

  provide(HTableRefreshLayoutInjectKey, refreshLayout);

  return {
    tableFooterDomRef,
    footerRowHeight,
    calculateColumnsLayout,
    refreshLayout,
    refreshScrollbarSpacing,
    scrollbarBeginEndSpacing,
    firstHeaderRowHeight,
  };
}

export function getFixedStyle(
  columnData: HTableColumnData,
  getFixedState: (uuid: string) => HTableFixedValue,
): CSSProperties {
  switch (getFixedState(columnData.uuid)) {
    case 'left':
      return {
        left: columnData[HTableColumnContextKey].prevColumnsWidthSum + 'px',
      };
    case 'right':
      return {
        right: columnData[HTableColumnContextKey].nextColumnsWidthSum + 'px',
      };
    default:
      return {};
  }
}

export function isFirstColumn(columnData: HTableColumnData) {
  return !columnData[HTableColumnContextKey].prevColumn;
}

export function isLastColumn(columnData: HTableColumnData) {
  return !columnData[HTableColumnContextKey].nextColumn;
}

export function isLastFixedColumn(
  columnData: HTableColumnData,
  getFixedState: (uuid: string) => HTableFixedValue,
) {
  switch (getFixedState(columnData.uuid)) {
    case 'left':
      return (
        columnData[HTableColumnContextKey].nextColumn &&
        getFixedState(columnData[HTableColumnContextKey].nextColumn.uuid) !== 'left'
      );
    case 'right':
      return (
        columnData[HTableColumnContextKey].prevColumn &&
        getFixedState(columnData[HTableColumnContextKey].prevColumn.uuid) !== 'right'
      );
    default:
      return false;
  }
}

export function getHeaderStyle(
  columnData: HTableColumnData,
  append?: {
    minWidth?: string;
  },
): CSSProperties {
  return {
    top: columnData[HTableColumnContextKey].parentColumnsHeightSum + 'px',
    minWidth: append?.minWidth
      ? `calc(${sizeUnitTransform(columnData.props.minWidth)} + ${append.minWidth})`
      : sizeUnitTransform(columnData.props.minWidth),
    width:
      columnData[HTableColumnContextKey].resizeWidth > 0
        ? columnData[HTableColumnContextKey].resizeWidth + 'px'
        : undefined,
  };
}

export function getBodyStyle(columnData: HTableColumnData): CSSProperties {
  return {
    minWidth: sizeUnitTransform(columnData.props.minWidth),
    maxWidth:
      columnData[HTableColumnContextKey].resizeWidth > 0
        ? columnData[HTableColumnContextKey].resizeWidth + 'px'
        : undefined,
  };
}

export function getFooterStyle(rowIndex: number, footerRowHeight: Ref<number[]>): CSSProperties {
  return {
    bottom: `${footerRowHeight.value?.[rowIndex] ?? 46}px`,
  };
}
