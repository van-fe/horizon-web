<script setup lang="ts">
import { ref } from 'vue';

interface ReleaseRow {
  id: string;
  product: string;
  owner: string;
  target: string;
  status: 'Ready' | 'Review' | 'Blocked';
}

const activeRelease = ref('No release selected');
const releases: ReleaseRow[] = [
  {
    id: 'REL-2048',
    product: 'Checkout refresh',
    owner: 'Mina Park',
    target: 'Aug 08',
    status: 'Ready',
  },
  {
    id: 'REL-2051',
    product: 'Usage alerts',
    owner: 'Noah Chen',
    target: 'Aug 12',
    status: 'Review',
  },
  {
    id: 'REL-2054',
    product: 'Team exports',
    owner: 'Iris Wang',
    target: 'Aug 15',
    status: 'Blocked',
  },
  {
    id: 'REL-2058',
    product: 'Audit history',
    owner: 'Leo Martin',
    target: 'Aug 19',
    status: 'Ready',
  },
];

function selectRelease(row: ReleaseRow) {
  activeRelease.value = `${row.id} · ${row.product}`;
}
</script>

<template>
  <div class="table-basic-demo">
    <h-table :data="releases" row-key="id" hoverable @row-click="selectRelease">
      <h-table-column title="Release" field="id" width="116" />
      <h-table-column title="Product" field="product" min-width="180" />
      <h-table-column title="Owner" field="owner" min-width="140" />
      <h-table-column title="Target" field="target" width="104" />
      <h-table-column title="Status" width="112">
        <template #default="{ row }">
          <h-tag
            :type="
              row.status === 'Ready' ? 'success' : row.status === 'Blocked' ? 'error' : 'warning'
            "
            plain
          >
            {{ row.status }}
          </h-tag>
        </template>
      </h-table-column>
    </h-table>
    <p aria-live="polite">Selected: {{ activeRelease }}</p>
  </div>
</template>

<style scoped>
.table-basic-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-basic-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
