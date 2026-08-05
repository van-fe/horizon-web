<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import type { HTableState } from '@aurora/horizon-web';

const tableRef = ref<{
  exportState: () => HTableState;
  restoreState: (state: Partial<HTableState>) => boolean;
  resetState: () => void;
}>();
const savedState = shallowRef<HTableState>();
const status = ref('Adjust a column, then capture and restore the table state.');
const accounts = [
  { id: 'A-184', account: 'Northwind', owner: 'Mina Park', segment: 'Enterprise' },
  { id: 'A-217', account: 'Contoso', owner: 'Noah Chen', segment: 'Business' },
  { id: 'A-249', account: 'Fabrikam', owner: 'Iris Wang', segment: 'Enterprise' },
  { id: 'A-273', account: 'Globex', owner: 'Leo Martin', segment: 'Growth' },
];

function captureState() {
  savedState.value = tableRef.value?.exportState();
  status.value = 'Current table state captured.';
}

function restoreState() {
  const restored = savedState.value ? tableRef.value?.restoreState(savedState.value) : false;
  status.value = restored ? 'Captured table state restored.' : 'Capture a state first.';
}

function resetState() {
  tableRef.value?.resetState();
  status.value = 'Table returned to its initial state.';
}
</script>

<template>
  <div class="table-state-demo">
    <h-space wrap>
      <h-button size="small" @click="captureState">Capture state</h-button>
      <h-button size="small" type="normal" :disabled="!savedState" @click="restoreState">
        Restore
      </h-button>
      <h-button size="small" type="normal" @click="resetState">Reset</h-button>
    </h-space>

    <h-table ref="tableRef" :data="accounts" row-key="id" use-column-manager>
      <h-table-column title="ID" field="id" width="100" sortable />
      <h-table-column title="Account" field="account" min-width="160" filterable resizable />
      <h-table-column title="Owner" field="owner" min-width="140" filterable />
      <h-table-column title="Segment" field="segment" min-width="130" filterable />
    </h-table>

    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<style scoped>
.table-state-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.table-state-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
