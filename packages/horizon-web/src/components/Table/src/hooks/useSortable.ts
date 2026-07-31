import type { Ref, SetupContext } from 'vue';
import { computed, watch, provide, ref } from 'vue';
import type {
  HTableColumnData,
  HTableSortType,
  HTableTransformedRowDataType,
} from '../utils/types';
import { HTableSortOrderEnum } from '../utils/types';
import type { TableEmits } from '../composables/useEmits';
import {
  HTableCurrentSortsInjectKey,
  HTableSetSortInjectKey,
  HTableSortRowInjectKey,
} from '../utils/injectKeys';
import get from 'lodash/get';
import { warn } from '~/utils/useLog';

export default function useSortable(
  emit: SetupContext<TableEmits>['emit'],
  columns: Ref<{
    columnGroups: HTableColumnData[][];
    flattenColumns: HTableColumnData[];
  }>,
  defaultSort: Ref<HTableSortType[]>,
  useBuiltInSort: () => boolean = () => true,
) {
  const currentSorts = ref(new Map<HTableColumnData, HTableSortOrderEnum>());

  const currentSortsArr = computed(() => Array.from(currentSorts.value.entries()));

  watch(
    currentSortsArr,
    (val, oldValue) => {
      emit(
        'sortChange',
        val.map(([column, order]) => ({
          column,
          order,
        })),
      );

      val.forEach(([key, value]) => {
        if (oldValue.find(curr => curr[0] === key)?.[1] !== value) {
          key.emit('sortChange', value);
        }
      });

      oldValue.forEach(([key]) => {
        if (!val.find(curr => curr[0] === key)) {
          key.emit('sortChange', null);
        }
      });
    },
    {
      deep: true,
    },
  );

  watch(
    () => columns.value.flattenColumns,
    val => {
      const previousSorts = new Map(
        Array.from(currentSorts.value.entries()).map(([column, order]) => [column.uuid, order]),
      );
      const nextSorts = new Map<HTableColumnData, HTableSortOrderEnum>();

      val.forEach(column => {
        const order = previousSorts.get(column.uuid);
        if (order) {
          nextSorts.set(column, order);
        }
      });

      currentSorts.value = nextSorts;
    },
  );

  watch(
    [() => columns.value.flattenColumns, defaultSort],
    ([availableColumns, defaults]) => {
      if (availableColumns.length === 0) {
        return;
      }

      const nextSorts = new Map<HTableColumnData, HTableSortOrderEnum>();

      defaults.forEach(sort => {
        const column = availableColumns.find(
          current => current.props.field === sort.prop || current.props.columnKey === sort.prop,
        );

        if (column) {
          nextSorts.set(column, sort.order);
        }
      });

      if (defaults.length > 0) {
        currentSorts.value = nextSorts;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  function setColumnSort(column: HTableColumnData, sortOrder?: HTableSortOrderEnum) {
    if (sortOrder) {
      if (currentSorts.value.get(column) === sortOrder) {
        currentSorts.value.delete(column);
      } else {
        currentSorts.value.set(column, sortOrder);
      }
      return;
    }

    const sortOrders = column.props.sortOrders;
    const currentOrder = currentSorts.value.get(column) ?? null;
    const currentIndex = sortOrders.indexOf(currentOrder);
    const nextOrder = sortOrders[(currentIndex + 1) % sortOrders.length];

    if (nextOrder) {
      currentSorts.value.set(column, nextOrder);
    } else {
      currentSorts.value.delete(column);
    }
  }

  function setSort(
    column: HTableColumnData,
    sortOrder?: HTableSortOrderEnum | false,
    multiFunctionKeyPressed: boolean = false,
  ) {
    if (sortOrder === false) {
      currentSorts.value.delete(column);
      return;
    }

    if (!multiFunctionKeyPressed) {
      currentSorts.value.forEach((value, key) => {
        if (column.uuid !== key.uuid) {
          currentSorts.value.delete(key);
        }
      });
    }

    setColumnSort(column, sortOrder);
  }

  function sortRow(a: HTableTransformedRowDataType, b: HTableTransformedRowDataType) {
    if (!useBuiltInSort()) return 0;

    for (const [column, order] of currentSorts.value) {
      let sortRes: number;
      if (!column.props.useBuiltInSort || column.props.sortable === 'custom') {
        continue;
      } else if (column.props.sortMethod) {
        sortRes = column.props.sortMethod(order)(a, b);
      } else if (column.props.sortBy) {
        sortRes = column.props.sortBy(a, b);
        if (order === HTableSortOrderEnum.DESC) {
          sortRes *= -1;
        }
      } else {
        const field = column.props.field;

        if (!field) {
          warn('table', `Column should set 'field' first to sort.`);
          continue;
        }

        const aValue = get(a, field);
        const bValue = get(b, field);
        const baseResult =
          typeof aValue === 'number' && typeof bValue === 'number'
            ? aValue - bValue
            : String(aValue ?? '').localeCompare(String(bValue ?? ''), undefined, {
                numeric: true,
              });

        sortRes = order === HTableSortOrderEnum.ASC ? baseResult : -baseResult;
      }

      if (sortRes !== 0) {
        return sortRes;
      }
    }

    return 0;
  }

  provide(HTableCurrentSortsInjectKey, currentSorts);
  provide(HTableSetSortInjectKey, setSort);
  provide(HTableSortRowInjectKey, sortRow);

  return {
    currentSorts,
    setSort,
    sortRow,
  };
}
