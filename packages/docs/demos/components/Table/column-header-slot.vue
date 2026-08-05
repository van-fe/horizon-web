<script setup lang="ts">
import { computed, ref } from 'vue';

const ownerQuery = ref('');
const reviews = [
  { item: 'Checkout copy', owner: 'Mina Park', team: 'Commerce', updated: 'Aug 03' },
  { item: 'Access policy', owner: 'Noah Chen', team: 'Security', updated: 'Aug 02' },
  { item: 'Export flow', owner: 'Iris Wang', team: 'Analytics', updated: 'Aug 01' },
  { item: 'Token migration', owner: 'Leo Martin', team: 'Design systems', updated: 'Jul 31' },
  { item: 'Alert routing', owner: 'Avery Kim', team: 'Platform', updated: 'Jul 30' },
];
const filteredReviews = computed(() => {
  const query = ownerQuery.value.trim().toLowerCase();
  return query ? reviews.filter(row => row.owner.toLowerCase().includes(query)) : reviews;
});
</script>

<template>
  <div class="table-header-slot-demo">
    <h-table :data="filteredReviews" row-key="item">
      <h-table-column title="Item" field="item" min-width="180" />
      <h-table-column title="Owner" field="owner" min-width="190">
        <template #header>
          <div class="table-header-slot-demo__search">
            <span>Owner</span>
            <h-input
              v-model="ownerQuery"
              size="small"
              clearable
              aria-label="Filter by owner"
              placeholder="Filter"
            />
          </div>
        </template>
      </h-table-column>
      <h-table-column title="Team" field="team" min-width="150" />
      <h-table-column title="Updated" field="updated" width="104" />
    </h-table>
    <p aria-live="polite">{{ filteredReviews.length }} matching rows.</p>
  </div>
</template>

<style scoped>
.table-header-slot-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-header-slot-demo__search {
  display: grid;
  grid-template-columns: auto minmax(100px, 1fr);
  align-items: center;
  gap: var(--h-spacing-2);
}

.table-header-slot-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
