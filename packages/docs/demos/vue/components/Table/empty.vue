<script setup lang="ts">
import { ref } from 'vue';

const status = ref('No invoices match the current filters.');

function clearFilters() {
  status.value = 'Filters cleared; results would be requested here.';
}
</script>

<template>
  <div class="table-empty-demo">
    <h-table :data="[]" height="260">
      <h-table-column title="Invoice" field="id" width="120" />
      <h-table-column title="Customer" field="customer" min-width="180" />
      <h-table-column title="Due date" field="due" width="120" />
      <h-table-column title="Amount" field="amount" width="120" />
      <template #empty>
        <div class="table-empty-demo__empty">
          <strong>No matching invoices</strong>
          <span>Try a wider date range or remove a filter.</span>
          <h-button size="small" @click="clearFilters">Clear filters</h-button>
        </div>
      </template>
    </h-table>
    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<style scoped>
.table-empty-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-empty-demo__empty {
  display: grid;
  justify-items: center;
  gap: var(--h-spacing-2);
  padding: var(--h-spacing-5);
  text-align: center;
}

.table-empty-demo__empty span,
.table-empty-demo > p {
  color: var(--h-text-secondary);
}

.table-empty-demo > p {
  margin: 0;
  font-size: var(--h-text-sm);
}
</style>
