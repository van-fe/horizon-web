<script setup lang="ts">
import { computed, ref } from 'vue';
import type { HTableDataProcessingMode, HTableDataProcessingState } from '@aurora/horizon-web';

const departments = ['Platform', 'Growth', 'Design', 'Operations'];
const mode = ref<HTableDataProcessingMode>('auto');
const tableRef = ref<{
  refreshDataProcessing: () => Promise<HTableDataProcessingState>;
}>();
const rows = ref(
  Array.from({ length: 50_000 }, (_, id) => ({
    id,
    member: 'Member ' + String(id + 1).padStart(5, '0'),
    department: departments[id % departments.length],
    score: (id * 37) % 1000,
    updatedAt:
      '2026-' +
      String((id % 12) + 1).padStart(2, '0') +
      '-' +
      String((id % 28) + 1).padStart(2, '0'),
  })),
);
const processing = ref<HTableDataProcessingState>({
  revision: 0,
  status: 'idle',
  requestedMode: 'auto',
  mode: 'sync',
  rowCount: rows.value.length,
  resultRowCount: rows.value.length,
  duration: 0,
});
const statusText = computed(() => {
  const fallback = processing.value.fallbackReason ? ' · ' + processing.value.fallbackReason : '';
  return (
    processing.value.status +
    ' · ' +
    processing.value.resultRowCount.toLocaleString() +
    ' rows · ' +
    processing.value.duration.toFixed(1) +
    ' ms' +
    fallback
  );
});

async function refreshProcessing() {
  const next = await tableRef.value?.refreshDataProcessing();
  if (next) processing.value = next;
}
</script>

<template>
  <div class="table-processing-demo">
    <div class="table-processing-demo__toolbar">
      <label>
        <span>Execution mode</span>
        <h-segmented v-model:active-key="mode" size="small" block>
          <h-segmented-item value="sync" label="Sync" />
          <h-segmented-item value="auto" label="Auto" />
          <h-segmented-item value="worker" label="Worker" />
        </h-segmented>
      </label>

      <h-button size="small" @click="refreshProcessing">Reprocess</h-button>
    </div>

    <h-table
      ref="tableRef"
      :data="rows"
      row-key="id"
      height="320"
      stripe
      :watch-data="false"
      :data-processing="{ mode, workerThreshold: 5000, debounce: 24 }"
      :virtual="{ itemSize: 45, buffer: 120 }"
      @data-processing-change="processing = $event"
    >
      <h-table-column title="ID" field="id" width="80" sortable />
      <h-table-column title="Member" field="member" min-width="150" filterable />
      <h-table-column
        title="Department"
        field="department"
        min-width="140"
        filterable
        filter-type="select"
      />
      <h-table-column title="Score" field="score" width="100" sortable />
      <h-table-column title="Updated" field="updatedAt" min-width="130" sortable />
    </h-table>

    <p class="table-processing-demo__status" role="status">{{ statusText }}</p>
  </div>
</template>

<style scoped>
.table-processing-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.table-processing-demo__status {
  margin: 0;
}

.table-processing-demo__toolbar span,
.table-processing-demo__status {
  color: var(--h-text-secondary);
}

.table-processing-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
  align-items: end;
}

.table-processing-demo__toolbar label {
  display: grid;
  gap: var(--h-spacing-2);
}

.table-processing-demo__status {
  font-size: var(--h-text-sm);
  overflow-wrap: anywhere;
}
</style>
