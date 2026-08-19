import type { Ref } from 'vue';
import { watch, ref } from 'vue';
import type { HTableInsertedColumnData } from '../utils/types';

export default function useColumnVisible(columns: Ref<HTableInsertedColumnData[]>) {
  const visibleStore = ref(new Map<string, boolean>());
  const visibleStoreBack = ref(visibleStore.value);

  watch(
    columns,
    val => {
      collectVisibleColumns(val);
      visibleStoreBack.value = new Map(visibleStore.value);
    },
    {
      deep: true,
    },
  );

  function collectVisibleColumns(columns: HTableInsertedColumnData[]) {
    columns.forEach(column => {
      if (!visibleStore.value.has(column.uuid))
        visibleStore.value.set(column.uuid, column.props.visible);

      if (column.children.length) {
        collectVisibleColumns(column.children);
      }
    });
  }

  function getVisibleState(columnUuid: string, checkStore = visibleStore.value) {
    return checkStore.get(columnUuid) ?? false;
  }

  function resetVisibleState() {
    visibleStore.value = new Map(visibleStoreBack.value);
  }

  return {
    visibleStore,
    getVisibleState,
    resetVisibleState,
  };
}
