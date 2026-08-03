import type { Ref } from 'vue';
import { watch, ref } from 'vue';
import type { HTableInsertedColumnData } from '../utils/types';

export default function useColumnSort(columns: Ref<HTableInsertedColumnData[]>) {
  const sortStore = ref(new Map<string, number>());
  const sortStoreBack = ref(new Map<string, number>());
  let previousDeclaredOrders = new Map<string, number | undefined>();

  function isSameMap<T>(a: Map<string, T>, b: Map<string, T>) {
    return a.size === b.size && [...a].every(([key, value]) => b.get(key) === value);
  }

  watch(
    columns,
    val => {
      const nextSortStore = new Map(sortStore.value);
      const declaredOrders = new Map<string, number | undefined>();

      collectSortColumns(val, declaredOrders);

      declaredOrders.forEach((order, uuid) => {
        if (!previousDeclaredOrders.has(uuid) || previousDeclaredOrders.get(uuid) !== order) {
          if (order === undefined) {
            nextSortStore.delete(uuid);
          } else {
            nextSortStore.set(uuid, order);
          }
        }
      });

      nextSortStore.forEach((_, uuid) => {
        if (!declaredOrders.has(uuid)) {
          nextSortStore.delete(uuid);
        }
      });

      const nextSortStoreBack = new Map(
        [...declaredOrders].filter((entry): entry is [string, number] => entry[1] !== undefined),
      );

      if (!isSameMap(sortStore.value, nextSortStore)) {
        sortStore.value = nextSortStore;
      }

      if (!isSameMap(sortStoreBack.value, nextSortStoreBack)) {
        sortStoreBack.value = nextSortStoreBack;
      }

      previousDeclaredOrders = declaredOrders;
    },
    {
      deep: true,
      immediate: true,
    },
  );

  function collectSortColumns(
    columns: HTableInsertedColumnData[],
    target: Map<string, number | undefined>,
  ) {
    columns.forEach(column => {
      target.set(column.uuid, column.props.order);

      if (column.children.length) {
        collectSortColumns(column.children, target);
      }
    });
  }

  function getSortState(columnUuid: string, checkStore = sortStore.value) {
    return checkStore.get(columnUuid);
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
