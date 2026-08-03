import type { Ref, SetupContext } from 'vue';
import { onScopeDispose, ref, watch } from 'vue';
import type { HTableInsertedColumnData, HTableTransformedRowDataType } from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';
import type { TableEmits } from '../composables/useEmits';
import { warn } from '~/utils/useLog';
import { isDefined, isNil } from '@aurora/utils';
import type { DatePickerProps } from '~/components/DatePicker/src/composables/useProps';
import dayjs from '~/utils/useDayJs';
import { getCompareUnitByType } from '~/components/DatePicker/src/utils/useDayjs';
import type { TimePickerProps } from '~/components/TimePicker/src/composables/useProps';
import get from 'lodash/get';

export function isTableFilterValueActive(value: unknown): boolean {
  if (isNil(value)) return false;
  if (!Array.isArray(value)) return true;
  return value.length > 0 && value.some(isTableFilterValueActive);
}

/**
 * 将列过滤配置预编译为逐行谓词，避免在大数据扫描中重复解析查询值。
 * @en Compiles a column filter into a row predicate so query values are parsed once per scan.
 */
export function createTableFilterPredicate(
  column: HTableInsertedColumnData,
  value: unknown,
): (row: HTableTransformedRowDataType) => boolean {
  const field = column.props.field;
  if (!field || !isTableFilterValueActive(value)) return () => true;

  if (isDefined(column.props.filterMethod)) {
    return row => column.props.filterMethod(value, row, column);
  }

  switch (column.props.filterType) {
    case 'input':
    case 'input-number': {
      const query = String(value).trim().toLocaleLowerCase();
      return row =>
        String(get(row, field) ?? '')
          .toLocaleLowerCase()
          .includes(query);
    }
    case 'select':
    case 'tree-select':
    case 'cascader': {
      const multiple = (column.props.filterOptions as { multiple?: boolean } | undefined)?.multiple;
      if (multiple !== false) {
        const values = Array.isArray(value) ? value : [value];
        return row => values.some(current => current === get(row, field));
      }
      return row => String(get(row, field) ?? '') === String(value);
    }
    case 'date-picker': {
      const options = column.props.filterOptions as Partial<DatePickerProps> | undefined;
      const compareUnit = getCompareUnitByType(options?.type ?? 'date');
      const isRange = options?.type?.toLowerCase().includes('range') === true;
      const range = Array.isArray(value) ? value : [];
      const start = dayjs(range[0]);
      const end = dayjs(range[1]);
      const target = dayjs(value as any);

      return row => {
        const current = dayjs(get(row, field));
        return isRange
          ? current.isSameOrAfter(start, compareUnit) && current.isSameOrBefore(end, compareUnit)
          : current.isSame(target, compareUnit);
      };
    }
    case 'time-picker': {
      const options = column.props.filterOptions as Partial<TimePickerProps> | undefined;
      const isRange = options?.isRange === true;
      const range = Array.isArray(value) ? value : [];
      const start = dayjs(range[0], 'HH:mm:ss');
      const end = dayjs(range[1], 'HH:mm:ss');
      const target = dayjs(value as any, 'HH:mm:ss');

      return row => {
        const current = dayjs(get(row, field), 'HH:mm:ss');
        return isRange
          ? current.isSameOrAfter(start, 'seconds') && current.isSameOrBefore(end, 'seconds')
          : current.isSame(target, 'seconds');
      };
    }
    default:
      return () => true;
  }
}

export default function useFilter(
  column: HTableInsertedColumnData,
  emit: SetupContext<TableEmits>['emit'],
  flattenData: Ref<HTableTransformedRowDataType[]>,
  useBuiltInFilter: () => boolean = () => true,
) {
  const currentFilterValue = ref();
  const filterRevision = ref(0);
  const configurationRevision = ref(0);
  let hasAppliedVisibility = false;

  function clearVisibility() {
    if (!hasAppliedVisibility) return;
    flattenData.value.forEach(row => {
      delete (row[HTableTransformedRowContextKey].visible as Record<string, boolean>)[column.uuid];
    });
    hasAppliedVisibility = false;
  }

  watch(
    currentFilterValue,
    val => {
      column.emit('filterChange', val);
      filterRevision.value++;
    },
    { deep: true },
  );

  watch(
    [
      () => column.props.field,
      () => typeof column.props.filterMethod === 'function',
      () =>
        (
          column.props.filterOptions as
            | { multiple?: boolean; type?: string; isRange?: boolean }
            | undefined
        )?.multiple,
      () =>
        (
          column.props.filterOptions as
            | { multiple?: boolean; type?: string; isRange?: boolean }
            | undefined
        )?.type,
      () =>
        (
          column.props.filterOptions as
            | { multiple?: boolean; type?: string; isRange?: boolean }
            | undefined
        )?.isRange,
      () => column.props.filterType,
      () => column.props.useBuiltInFilter,
    ],
    () => {
      configurationRevision.value++;
    },
  );

  watch(
    [filterRevision, configurationRevision, useBuiltInFilter, flattenData],
    ([, , builtIn]) => {
      const val = currentFilterValue.value;
      const field = column.props.field;
      if (!field) {
        clearVisibility();
        if (isTableFilterValueActive(val)) {
          warn('table', `Column should set 'field' first to filter.`);
        }
        return;
      }

      if (!builtIn || !column.props.useBuiltInFilter || !isTableFilterValueActive(val)) {
        clearVisibility();
        return;
      }

      const predicate = createTableFilterPredicate(column, val);
      for (const row of flattenData.value) {
        (row[HTableTransformedRowContextKey].visible as unknown as Record<string, boolean>)[
          column.uuid
        ] = predicate(row);
      }
      hasAppliedVisibility = true;
    },
    { immediate: true },
  );

  onScopeDispose(clearVisibility);

  return {
    configurationRevision,
    currentFilterValue,
  };
}
