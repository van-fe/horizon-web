<template>
  <div class="table-demo-toolbar">
    <h-button @click="save">Save state</h-button>
    <h-button @click="restore">Restore state</h-button>
    <h-button @click="tableRef?.resetState()">Reset</h-button>
    <h-switch v-model="remote" label="Remote query" label-position="right" />
  </div>

  <h-table
    ref="tableRef"
    :data="data"
    row-key="id"
    use-column-manager
    :query-mode="remote ? 'remote' : 'local'"
    @query-change="query = $event"
  >
    <h-table-column title="ID" field="id" width="90" sortable />
    <h-table-column title="Name" field="name" min-width="180" filterable resizable />
    <h-table-column title="Department" field="department" min-width="180" filterable />
  </h-table>
  <pre class="table-demo-state">{{ JSON.stringify(query, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HTableQuery, HTableState } from '@aurora/horizon-web';

const storageKey = 'horizon-table-demo-state';
const tableRef = ref<{
  exportState: () => HTableState;
  restoreState: (state: Partial<HTableState>) => boolean;
  resetState: () => void;
}>();
const remote = ref(false);
const query = ref<HTableQuery>({ sorting: [], filters: {} });
const data = [
  { id: 1, name: 'Alice', department: 'Design' },
  { id: 2, name: 'Bob', department: 'Platform' },
  { id: 3, name: 'Carol', department: 'Growth' },
];

function save() {
  localStorage.setItem(storageKey, JSON.stringify(tableRef.value?.exportState()));
}

function restore() {
  const value = localStorage.getItem(storageKey);
  if (value) tableRef.value?.restoreState(JSON.parse(value));
}
</script>

<style scoped>
.table-demo-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.table-demo-state {
  min-height: 72px;
  margin-top: 12px;
  padding: 12px;
  background: var(--h-fill-tertiary);
}
</style>
