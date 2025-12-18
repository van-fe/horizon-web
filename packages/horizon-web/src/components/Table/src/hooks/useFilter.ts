import type { Ref, SetupContext } from 'vue';
import { ref, watch } from 'vue';
import type { NTableInsertedColumnData, NTableTransformedRowDataType } from '../utils/types';
import { NTableTransformedRowContextKey } from '../utils/types';
import type { TableEmits } from '../composables/useEmits';
import { warn } from '~/utils/useLog';
import { isDefined, isNil } from '@aurora/shared';
import type { SelectProps } from '~/components/Select/src/composables/useProps';
import type { DatePickerProps } from '~/components/DatePicker/src/composables/useProps';
import dayjs from '~/utils/useDayJs';
import { getCompareUnitByType } from '~/components/DatePicker/src/utils/useDayjs';
import type { TimePickerProps } from '~/components/TimePicker/src/composables/useProps';
import type { TreeSelectProps } from '~/components/TreeSelect/src/composables/useProps';

export default function useFilter(
  column: NTableInsertedColumnData,
  emit: SetupContext<TableEmits>['emit'],
  flattenData: Ref<NTableTransformedRowDataType[]>,
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
        row[NTableTransformedRowContextKey].visible[column.props.field] = column.props.filterMethod(
          val,
          row,
          column,
        );

        continue;
      }

      if (isNil(val)) {
        row[NTableTransformedRowContextKey].visible[column.props.field] = true;
      } else {
        switch (column.props.filterType) {
          case 'input':
          case 'input-number':
            row[NTableTransformedRowContextKey].visible[column.props.field] = rowColumnValue
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
              row[NTableTransformedRowContextKey].visible[column.props.field] = val.length
                ? val.some((curr: unknown) => curr === rowColumnValue)
                : true;
            } else {
              row[NTableTransformedRowContextKey].visible[column.props.field] =
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
                row[NTableTransformedRowContextKey].visible[column.props.field] =
                  currDayjs.isSameOrAfter(dayjs(val[0]), compareUnit) &&
                  currDayjs.isSameOrBefore(dayjs(val[1]), compareUnit);
              } else {
                row[NTableTransformedRowContextKey].visible[column.props.field] = currDayjs.isSame(
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
                row[NTableTransformedRowContextKey].visible[column.props.field] =
                  currDayjs.isSameOrAfter(dayjs(val[0], 'HH:mm:ss'), 'seconds') &&
                  currDayjs.isSameOrBefore(dayjs(val[1], 'HH:mm:ss'), 'seconds');
              } else {
                row[NTableTransformedRowContextKey].visible[column.props.field] = currDayjs.isSame(
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
