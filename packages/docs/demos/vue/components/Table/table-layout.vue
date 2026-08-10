<script setup lang="ts">
import { ref } from 'vue';
import type { TableProps } from '@aurora/horizon-web';

const tableLayout = ref<TableProps['tableLayout']>('fixed');
const changes = [
  {
    id: 'CHG-184',
    change: 'Rotate the production signing certificate',
    owner: 'Security',
    window: 'Aug 06 · 01:00 UTC',
    note: 'Requires coordinated restarts across four regional gateways.',
  },
  {
    id: 'CHG-191',
    change: 'Migrate warehouse compute pool',
    owner: 'Data Infra',
    window: 'Aug 08 · 03:00 UTC',
    note: 'Long-running reports continue on the previous pool.',
  },
  {
    id: 'CHG-198',
    change: 'Enable checkout retry policy',
    owner: 'Commerce',
    window: 'Aug 11 · 02:30 UTC',
    note: 'Limited to recoverable provider timeouts.',
  },
];
</script>

<template>
  <div class="table-layout-demo">
    <h-segmented v-model:active-key="tableLayout" size="small">
      <h-segmented-item value="fixed" label="Fixed" />
      <h-segmented-item value="auto" label="Auto" />
    </h-segmented>
    <h-table
      :data="changes"
      row-key="id"
      :table-layout="tableLayout"
      cell-class-name="table-layout-demo-cell"
    >
      <h-table-column title="Change" field="id" width="110" />
      <h-table-column title="Description" field="change" min-width="190" />
      <h-table-column title="Owner" field="owner" width="120" />
      <h-table-column title="Window" field="window" width="170" />
      <h-table-column title="Notes" field="note" width="230" />
    </h-table>
    <p aria-live="polite">table-layout: {{ tableLayout }}</p>
  </div>
</template>

<style scoped>
.table-layout-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-layout-demo :deep(td.table-layout-demo-cell .h-table__cell-inner) {
  white-space: nowrap;
}

.table-layout-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
