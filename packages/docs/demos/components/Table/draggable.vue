<script setup lang="ts">
import { ref } from 'vue';

interface PriorityRow {
  id: string;
  initiative: string;
  owner: string;
  impact: string;
}

const orderStatus = ref('Drag rows or headers to reorder them.');
const priorities = ref<PriorityRow[]>([
  { id: 'P-14', initiative: 'Reduce checkout latency', owner: 'Platform', impact: 'High' },
  { id: 'P-22', initiative: 'Improve trial activation', owner: 'Growth', impact: 'High' },
  { id: 'P-31', initiative: 'Consolidate audit logs', owner: 'Security', impact: 'Medium' },
  { id: 'P-37', initiative: 'Refresh design tokens', owner: 'Design systems', impact: 'Medium' },
]);

function onOrderUpdate(rows: PriorityRow[]) {
  orderStatus.value = `Priority order: ${rows.map(row => row.id).join(' → ')}`;
}
</script>

<template>
  <div class="table-drag-demo">
    <h-table v-model:data="priorities" row-key="id" @update:data="onOrderUpdate">
      <h-table-column type="drag" width="48" />
      <h-table-column title="Priority" field="id" width="110" draggable />
      <h-table-column title="Initiative" field="initiative" min-width="220" draggable />
      <h-table-column title="Owner" field="owner" min-width="145" draggable />
      <h-table-column title="Impact" field="impact" width="104" draggable />
    </h-table>
    <p aria-live="polite">{{ orderStatus }}</p>
  </div>
</template>

<style scoped>
.table-drag-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-drag-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
  overflow-wrap: anywhere;
}
</style>
