import type { Ref } from 'vue';
import { provide, watch, ref } from 'vue';
import type { NTableColumnData, NTableFixedValue, NTableInsertedColumnData } from '../utils/types';
import { formatFixed } from '../hooks/useLayout';
import { NTableGetColumnFixedStateInjectKey } from '../utils/injectKeys';

export function sortColumnsMethod(
  getFixedState: (
    columnUuid: string,
    checkStore?: Map<string, NTableFixedValue>,
  ) => NTableFixedValue,
) {
  return (a: NTableColumnData, b: NTableColumnData) => {
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

export default function useColumnFixed(columns: Ref<NTableInsertedColumnData[]>) {
  const fixedStore = ref(new Map<string, NTableFixedValue>());
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
    currentTree: NTableInsertedColumnData[],
    parent: null | NTableInsertedColumnData = null,
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

  provide(NTableGetColumnFixedStateInjectKey, getFixedState);

  return {
    fixedStore,
    getFixedState,
    resetFixedState,
  };
}
