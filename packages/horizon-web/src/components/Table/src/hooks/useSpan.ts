import type { TableProps } from '../composables/useProps';
import { isFunction, isObject } from '@aurora/shared';
import type { NTableColumnData, NTableTransformedRowDataType } from '../utils/types';

export default function useSpan(tableProps: TableProps) {
  function spanMethod(
    row: NTableTransformedRowDataType,
    column: NTableColumnData,
    rowIndex: number,
    columnIndex: number,
  ) {
    if (!isFunction(tableProps.spanMethod)) {
      return {
        rowSpan: 1,
        colSpan: 1,
      };
    } else {
      const res = tableProps.spanMethod({
        row,
        column,
        rowIndex,
        columnIndex,
      });

      if (Array.isArray(res)) {
        return {
          rowSpan: res[0],
          colSpan: res[1],
        };
      } else if (isObject(res)) {
        return {
          rowSpan: res.rowSpan || 1,
          colSpan: res.colSpan || 1,
        };
      } else {
        return {
          rowSpan: 1,
          colSpan: 1,
        };
      }
    }
  }

  return {
    spanMethod,
  };
}
