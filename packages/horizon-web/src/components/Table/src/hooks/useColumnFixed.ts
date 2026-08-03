import type { Ref } from 'vue';
import { provide, watch, ref } from 'vue';
import type { HTableFixedValue, HTableInsertedColumnData } from '../utils/types';
import { formatFixed } from './useLayout';
import { HTableGetColumnFixedStateInjectKey } from '../utils/injectKeys';

export function sortColumnsMethod(
  getFixedState: (
    columnUuid: string,
    checkStore?: Map<string, HTableFixedValue>,
  ) => HTableFixedValue,
) {
  return (a: { uuid: string }, b: { uuid: string }) => {
    const getRank = (state: HTableFixedValue) =>
      state === 'left' ? 0 : state === 'right' || state === 'hover' ? 2 : 1;

    return getRank(getFixedState(a.uuid)) - getRank(getFixedState(b.uuid));
  };
}

export default function useColumnFixed(columns: Ref<HTableInsertedColumnData[]>) {
  const fixedStore = ref(new Map<string, HTableFixedValue>());
  const fixedStoreBack = ref(new Map(fixedStore.value));

  watch(
    columns,
    val => {
      val.forEach(column => {
        if (!fixedStore.value.has(column.uuid)) {
          const fixedValue = formatFixed(column.props.fixed);
          if (fixedValue) {
            fixedStore.value.set(column.uuid, fixedValue);
          } else {
            fixedStore.value.delete(column.uuid);
          }
        }
      });

      fixedStoreBack.value = new Map(fixedStore.value);
    },
    {
      deep: true,
    },
  );

  function getTopParentInTree(
    uuid: string,
    currentTree: HTableInsertedColumnData[],
    parent: null | HTableInsertedColumnData = null,
  ) {
    if (currentTree.some(column => column.uuid === uuid)) {
      return parent;
    }

    for (const column of currentTree) {
      const hasFound = getTopParentInTree(uuid, column.children, column);

      if (hasFound) {
        return column;
      }
    }

    return false;
  }

  function getFixedState(columnUuid: string, checkStore = fixedStore.value) {
    if (checkStore.has(columnUuid)) {
      return checkStore.get(columnUuid);
    } else {
      const parent = getTopParentInTree(columnUuid, columns.value);

      if (parent) {
        return checkStore.get(parent.uuid);
      }
    }

    return undefined;
  }

  function resetFixedState() {
    fixedStore.value = new Map(fixedStoreBack.value);
  }

  provide(HTableGetColumnFixedStateInjectKey, getFixedState);

  return {
    fixedStore,
    getFixedState,
    resetFixedState,
  };
}
