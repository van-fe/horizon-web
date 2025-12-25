import type { Ref, SetupContext } from 'vue';
import { ref, watch } from 'vue';
import type { HTableInsertedColumnData, HTableTransformedRowDataType } from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';
import type { TableEmits } from '../composables/useEmits';
import { warn } from '~/utils/useLog';
import { isDefined, isNil } from '@aurora/utils';
import type { SelectProps } from '~/components/Select/src/composables/useProps';
import type { DatePickerProps } from '~/components/DatePicker/src/composables/useProps';
import dayjs from '~/utils/useDayJs';
import { getCompareUnitByType } from '~/components/DatePicker/src/utils/useDayjs';
import type { TimePickerProps } from '~/components/TimePicker/src/composables/useProps';
import type { TreeSelectProps } from '~/components/TreeSelect/src/composables/useProps';

export default function useFilter(
  column: HTableInsertedColumnData,
  emit: SetupContext<TableEmits>['emit'],
  flattenData: Ref<HTableTransformedRowDataType[]>,
) {
  const currentFilterValue = ref();

  watch(currentFilterValue, val => {
    if (!column.props.field) {
      warn('table', `Column should set 'field' first to filter.`);
      return;
    }

    column.emit('filterChange', val);

    if (!column.props.useBuiltInFilter) {
      return;
    }

    for (const row of flattenData.value) {
      const rowColumnValue = row[column.props.field];

      if (isDefined(column.props.filterMethod)) {
        row[HTableTransformedRowContextKey].visible[column.props.field] = column.props.filterMethod(
          val,
          row,
          column,
        );

        continue;
      }

      if (isNil(val)) {
        row[HTableTransformedRowContextKey].visible[column.props.field] = true;
      } else {
        switch (column.props.filterType) {
          case 'input':
          case 'input-number':
            row[HTableTransformedRowContextKey].visible[column.props.field] = rowColumnValue
              .toString()
              .toLowerCase()
              .includes(val.toString().trim().toLowerCase());
            break;
          case 'select':
          case 'tree-select':
            if (
              (column.props.filterOptions as Partial<SelectProps | TreeSelectProps>)?.multiple !==
              false
            ) {
              row[HTableTransformedRowContextKey].visible[column.props.field] = val.length
                ? val.some((curr: unknown) => curr === rowColumnValue)
                : true;
            } else {
              row[HTableTransformedRowContextKey].visible[column.props.field] =
                rowColumnValue?.toString() === val.toString();
            }
            break;
          case 'date-picker':
            {
              const currDayjs = dayjs(rowColumnValue);
              const compareUnit = getCompareUnitByType(
                (column.props.filterOptions as Partial<DatePickerProps>).type ?? 'date',
              );

              if (
                (column.props.filterOptions as Partial<DatePickerProps>)?.type
                  ?.toLowerCase()
                  .includes('range')
              ) {
                row[HTableTransformedRowContextKey].visible[column.props.field] =
                  currDayjs.isSameOrAfter(dayjs(val[0]), compareUnit) &&
                  currDayjs.isSameOrBefore(dayjs(val[1]), compareUnit);
              } else {
                row[HTableTransformedRowContextKey].visible[column.props.field] = currDayjs.isSame(
                  dayjs(val),
                  compareUnit,
                );
              }
            }
            break;
          case 'time-picker':
            {
              const currDayjs = dayjs(rowColumnValue, 'HH:mm:ss');

              if ((column.props.filterOptions as Partial<TimePickerProps>)?.isRange) {
                row[HTableTransformedRowContextKey].visible[column.props.field] =
                  currDayjs.isSameOrAfter(dayjs(val[0], 'HH:mm:ss'), 'seconds') &&
                  currDayjs.isSameOrBefore(dayjs(val[1], 'HH:mm:ss'), 'seconds');
              } else {
                row[HTableTransformedRowContextKey].visible[column.props.field] = currDayjs.isSame(
                  dayjs(val, 'HH:mm:ss'),
                  'seconds',
                );
              }
            }
            break;
        }
      }
    }
  });

  return {
    currentFilterValue,
  };
}
