import type { Ref } from 'vue';
import { watch, ref } from 'vue';
import type { NTableInsertedColumnData } from '../utils/types';

export default function useColumnVisible(columns: Ref<NTableInsertedColumnData[]>) {
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

  function collectVisibleColumns(columns: NTableInsertedColumnData[]) {
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
