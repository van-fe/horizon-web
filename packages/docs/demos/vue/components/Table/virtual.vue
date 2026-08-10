<script setup lang="ts">
import { nextTick, ref } from 'vue';
import type { HTableVisibleRange } from '@aurora/horizon-web';

const tableRef = ref<{
  scrollToIndex: (index: number) => void;
  getVisibleRange: () => HTableVisibleRange;
}>();
const status = ref('Only the visible slice of 5,000 activity records is rendered.');
const rows = Array.from({ length: 5000 }, (_, id) => ({
  id,
  member: `Member ${String(id + 1).padStart(4, '0')}`,
  activity: `Updated project activity ${id + 1}`,
}));

async function scrollToMiddle() {
  tableRef.value?.scrollToIndex(2500);
  await nextTick();
  const range = tableRef.value?.getVisibleRange();
  status.value = range
    ? `Row 2,500 is visible · rendered rows ${range.startIndex}–${range.endIndex}.`
    : 'Scrolled to row 2,500.';
}
</script>

<template>
  <div class="table-virtual-demo">
    <h-button class="table-virtual-demo__action" size="small" @click="scrollToMiddle">
      Jump to row 2,500
    </h-button>

    <h-table
      ref="tableRef"
      :data="rows"
      row-key="id"
      height="360"
      stripe
      :virtual="{ itemSize: 45, buffer: 120 }"
    >
      <h-table-column title="ID" field="id" width="90" fixed />
      <h-table-column title="Member" field="member" width="170" />
      <h-table-column title="Activity" field="activity" min-width="280" />
    </h-table>

    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<style scoped>
.table-virtual-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.table-virtual-demo__action {
  justify-self: start;
}

.table-virtual-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
