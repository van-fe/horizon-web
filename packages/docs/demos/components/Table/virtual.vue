<template>
  <div class="table-demo-toolbar">
    <h-switch v-model="enabled" label="Virtual" label-position="right" />
    <h-switch
      v-model="dynamic"
      label="Dynamic row height"
      label-position="right"
      :disabled="!enabled"
    />
    <h-button @click="scrollToMiddle">Scroll to row 2500</h-button>
    <span>Rendered: {{ range.startIndex }}–{{ range.endIndex }}</span>
  </div>

  <h-table
    ref="tableRef"
    :data="data"
    row-key="id"
    height="360"
    stripe
    :virtual="enabled ? { itemSize: 45, minItemSize: 45, dynamic, buffer: 120 } : false"
  >
    <h-table-column title="ID" field="id" width="90" fixed />
    <h-table-column title="Name" field="name" width="180" />
    <h-table-column title="Message" field="message" min-width="520">
      <template #default="{ row }">
        <span class="virtual-message">{{ row.message }}</span>
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { HTableVisibleRange } from '@aurora/horizon-web';

const enabled = ref(true);
const dynamic = ref(false);
const tableRef = ref<{
  scrollToIndex: (index: number) => void;
  getVisibleRange: () => HTableVisibleRange;
}>();
const range = reactive<HTableVisibleRange>({
  startIndex: 0,
  endIndex: 0,
  visibleStartIndex: 0,
  visibleEndIndex: 0,
});
const data = Array.from({ length: 5000 }, (_, id) => ({
  id,
  name: `Member ${id}`,
  message:
    id % 7 === 0
      ? `Row ${id} contains a longer description. Dynamic mode measures this wrapped content instead of assuming every row has the same height.`
      : `Activity for row ${id}`,
}));

function scrollToMiddle() {
  tableRef.value?.scrollToIndex(2500);
  requestAnimationFrame(() => Object.assign(range, tableRef.value?.getVisibleRange()));
}
</script>

<style scoped>
.table-demo-toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.virtual-message {
  white-space: normal;
}
</style>
