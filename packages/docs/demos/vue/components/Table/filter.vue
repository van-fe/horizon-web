<script setup lang="ts">
import { ref } from 'vue';

const filterStatus = ref('Use a column filter to narrow the table.');
const accounts = [
  {
    account: 'Northwind',
    owner: 'Mina Park',
    reviewDate: '2026-08-05',
    region: 'APAC',
    health: 'Healthy',
  },
  {
    account: 'Contoso',
    owner: 'Noah Chen',
    reviewDate: '2026-08-07',
    region: 'EMEA',
    health: 'Watch',
  },
  {
    account: 'Fabrikam',
    owner: 'Iris Wang',
    reviewDate: '2026-08-08',
    region: 'AMER',
    health: 'Healthy',
  },
  {
    account: 'Globex',
    owner: 'Leo Martin',
    reviewDate: '2026-08-11',
    region: 'APAC',
    health: 'Risk',
  },
  {
    account: 'Initech',
    owner: 'Avery Kim',
    reviewDate: '2026-08-12',
    region: 'EMEA',
    health: 'Watch',
  },
  {
    account: 'Umbrella',
    owner: 'Riley Chen',
    reviewDate: '2026-08-14',
    region: 'AMER',
    health: 'Healthy',
  },
];

function onFilterChange(value: unknown) {
  filterStatus.value = value ? 'Health filter updated.' : 'Health filter cleared.';
}
</script>

<template>
  <div class="table-filter-demo">
    <h-table :data="accounts" row-key="account" height="320">
      <h-table-column title="Account" field="account" min-width="160" filterable />
      <h-table-column title="Owner" field="owner" min-width="140" filterable />
      <h-table-column
        title="Review date"
        field="reviewDate"
        width="150"
        filterable
        filter-type="date-picker"
        :filter-options="{ type: 'date-range', valueFormat: 'YYYY-MM-DD' }"
      />
      <h-table-column title="Region" field="region" width="120" filterable filter-type="select" />
      <h-table-column
        title="Health"
        field="health"
        width="120"
        filterable
        filter-type="select"
        @filter-change="onFilterChange"
      />
    </h-table>
    <p aria-live="polite">{{ filterStatus }}</p>
  </div>
</template>

<style scoped>
.table-filter-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-filter-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
