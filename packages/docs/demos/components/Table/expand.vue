<script setup lang="ts">
const releases = [
  {
    id: 'REL-2048',
    product: 'Checkout refresh',
    owner: 'Mina Park',
    target: 'Aug 08',
    summary: 'Updates tax calculation and retry messaging.',
  },
  {
    id: 'REL-2051',
    product: 'Usage alerts',
    owner: 'Noah Chen',
    target: 'Aug 12',
    summary: 'Adds threshold alerts for workspace administrators.',
  },
  {
    id: 'REL-2054',
    product: 'Team exports',
    owner: 'Iris Wang',
    target: 'Aug 15',
    summary: 'Exports team activity in CSV and JSON formats.',
  },
];
</script>

<template>
  <h-table :data="releases" row-key="id">
    <h-table-column type="expand" width="48">
      <template #expand="{ row }">
        <p class="table-expand-demo__details">{{ row.summary }}</p>
      </template>
    </h-table-column>
    <h-table-column title="Release" field="id" width="118" />
    <h-table-column title="Product" field="product" min-width="180" />
    <h-table-column title="Owner" field="owner" min-width="140" />
    <h-table-column title="Target" field="target" width="106" />
  </h-table>
</template>

<style scoped>
.table-expand-demo__details {
  margin: 0;
  padding: var(--h-spacing-4);
  color: var(--h-text-secondary);
}
</style>
