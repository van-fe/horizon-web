<template>
  <div class="table-processing-demo">
    <div class="table-processing-demo__toolbar">
      <div class="table-processing-demo__field">
        <span>Execution mode</span>
        <code>data-processing</code>
        <h-segmented v-model:active-key="mode" size="small" block>
          <h-segmented-item key="sync" label="Sync" />
          <h-segmented-item key="auto" label="Auto" />
          <h-segmented-item key="worker" label="Worker" />
        </h-segmented>
      </div>
      <div class="table-processing-demo__field table-processing-demo__field--compact">
        <span>Immutable data</span>
        <code>:watch-data="false"</code>
        <h-switch v-model="immutable" />
      </div>
      <div class="table-processing-demo__status" aria-live="polite">
        <strong>{{ processing.mode }}</strong>
        <span>{{ processing.status }}</span>
        <span>{{ processing.resultRowCount.toLocaleString() }} rows</span>
        <span>{{ processing.duration.toFixed(1) }} ms</span>
        <span v-if="processing.fallbackReason">{{ processing.fallbackReason }}</span>
      </div>
    </div>

    <h-table
      :data="data"
      row-key="id"
      height="420"
      stripe
      :watch-data="!immutable"
      :data-processing="{ mode, workerThreshold: 5000, debounce: 24 }"
      :virtual="{ itemSize: 45, buffer: 120 }"
      @data-processing-change="processing = $event"
    >
      <h-table-column title="ID" field="id" width="100" sortable />
      <h-table-column title="Member" field="name" min-width="190" filterable />
      <h-table-column
        title="Department"
        field="department"
        min-width="170"
        filterable
        filter-type="select"
      />
      <h-table-column title="Score" field="score" width="130" sortable />
      <h-table-column title="Updated" field="updatedAt" min-width="190" sortable />
    </h-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HTableDataProcessingMode, HTableDataProcessingState } from '@aurora/horizon-web';

const departments = ['Platform', 'Growth', 'Design', 'Operations'];
const mode = ref<HTableDataProcessingMode>('auto');
const immutable = ref(true);
const data = ref(
  Array.from({ length: 50_000 }, (_, id) => ({
    id,
    name: `Member ${String(id + 1).padStart(5, '0')}`,
    department: departments[id % departments.length],
    score: (id * 37) % 1000,
    updatedAt: `2026-${String((id % 12) + 1).padStart(2, '0')}-${String((id % 28) + 1).padStart(2, '0')}`,
  })),
);
const processing = ref<HTableDataProcessingState>({
  revision: 0,
  status: 'idle',
  requestedMode: 'auto',
  mode: 'sync',
  rowCount: data.value.length,
  resultRowCount: data.value.length,
  duration: 0,
});
</script>

<style scoped>
.table-processing-demo {
  display: grid;
  gap: var(--h-spacing-5);
}

.table-processing-demo__toolbar {
  display: grid;
  grid-template-columns: minmax(280px, 1.4fr) minmax(180px, 0.8fr) minmax(220px, 1fr);
  gap: var(--h-spacing-5);
  align-items: end;
  padding: var(--h-spacing-5);
  border: 1px solid var(--h-border-divider-secondary);
  border-radius: var(--h-radius);
  background: var(--h-bg-secondary);
}

.table-processing-demo__field {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--h-spacing-2) var(--h-spacing-4);
  align-items: center;
}

.table-processing-demo__field > :last-child {
  grid-column: 1 / -1;
}

.table-processing-demo__field--compact > :last-child {
  justify-self: start;
}

.table-processing-demo__status {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-2) var(--h-spacing-4);
  align-items: center;
  min-height: 32px;
  color: var(--h-text-secondary);
}

.table-processing-demo__status strong {
  color: var(--h-text-primary);
  text-transform: uppercase;
}

@media (max-width: 760px) {
  .table-processing-demo__toolbar {
    grid-template-columns: 1fr;
  }
}
</style>
