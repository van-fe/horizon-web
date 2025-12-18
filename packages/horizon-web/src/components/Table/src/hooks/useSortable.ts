import type { SetupContext } from 'vue';
import { computed, watch, provide, ref } from 'vue';
import type { NTableColumnData, NTableTransformedRowDataType } from '../utils/types';
import { NTableSortOrderEnum } from '../utils/types';
import type { TableEmits } from '../composables/useEmits';
import {
  NTableCurrentSortsInjectKey,
  NTableSetSortInjectKey,
  NTableSortRowInjectKey,
} from '../utils/injectKeys';
import get from 'lodash/get';
import { warn } from '~/utils/useLog';

export default function useSortable(emit: SetupContext<TableEmits>['emit']) {
  const currentSorts = ref(new Map<NTableColumnData, NTableSortOrderEnum>());

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

  function setColumnSort(column: NTableColumnData, sortOrder?: NTableSortOrderEnum) {
    if (sortOrder) {
      if (currentSorts.value.get(column) === sortOrder) {
        currentSorts.value.delete(column);
      } else {
        currentSorts.value.set(column, sortOrder);
      }
      return;
    }

    switch (currentSorts.value.get(column)) {
      default:
        currentSorts.value.set(column, NTableSortOrderEnum.ASC);
        break;
      case NTableSortOrderEnum.ASC:
        currentSorts.value.set(column, NTableSortOrderEnum.DESC);
        break;
      case NTableSortOrderEnum.DESC:
        currentSorts.value.delete(column);
        break;
    }
  }

  function setSort(
    column: NTableColumnData,
    sortOrder?: NTableSortOrderEnum | false,
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

  function sortRow(a: NTableTransformedRowDataType, b: NTableTransformedRowDataType) {
    for (const [column, order] of currentSorts.value) {
      let sortRes: number;
      if (!column.props.useBuiltInSort) {
        continue;
      } else if (column.props.sortMethod) {
        sortRes = column.props.sortMethod(order)(a, b);
      } else {
        const field = column.props.field;

        if (!field) {
          warn('table', `Column should set 'field' first to sort.`);
          continue;
        }

        if (order === NTableSortOrderEnum.ASC) {
          sortRes = get(a, field)?.toString().localeCompare(get(b, field));
        } else {
          sortRes = get(b, field)?.toString().localeCompare(get(a, field));
        }
      }

      if (sortRes !== 0) {
        return sortRes;
      }
    }

    return 0;
  }

  provide(NTableCurrentSortsInjectKey, currentSorts);
  provide(NTableSetSortInjectKey, setSort);
  provide(NTableSortRowInjectKey, sortRow);

  return {
    currentSorts,
    setSort,
    sortRow,
  };
}
