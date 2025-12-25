import type { Ref } from 'vue';
import { watch, ref } from 'vue';
import type { HTableFixedValue, HTableInsertedColumnData } from '../utils/types';

export function sortColumnsMethod(
  getFixedState: (
    columnUuid: string,
    checkStore?: Map<string, HTableFixedValue>,
  ) => HTableFixedValue,
) {
  return (a: HTableInsertedColumnData, b: HTableInsertedColumnData) => {
    switch (getFixedState(a.uuid)) {
      case 'left':
        switch (getFixedState(b.uuid)) {
          case 'left':
            return 1;
          case 'hover':
          case 'right':
          default:
            return -1;
        }
      case 'right':
      case 'hover':
        return 1;
      default:
        switch (getFixedState(b.uuid)) {
          case 'left':
            return 1;
          default:
            return 0;
          case 'hover':
          case 'right':
            return -1;
        }
    }
  };
}

export default function useColumnSort(columns: Ref<HTableInsertedColumnData[]>) {
  const sortStore = ref(new Map<string, number>());
  const sortStoreBack = ref(sortStore.value);

  watch(
    columns,
    val => {
      collectSortColumns(val);
      sortStoreBack.value = new Map(sortStore.value);
    },
    {
      deep: true,
    },
  );

  function collectSortColumns(columns: HTableInsertedColumnData[]) {
    const currentColumns = columns;

    currentColumns.map(column => {
      if (column.props.order) {
        sortStore.value.set(column.uuid, column.props.order);
      }

      if (column.children.length) {
        collectSortColumns(column.children);
      }
    }).sort();
  }

  function getSortState(columnUuid: string, checkStore = sortStore.value) {
    return checkStore.get(columnUuid) ?? false;
  }

  function resetSortState() {
    sortStore.value = new Map(sortStoreBack.value);
  }

  return {
    sortStore,
    getSortState,
    resetSortState,
  };
}
