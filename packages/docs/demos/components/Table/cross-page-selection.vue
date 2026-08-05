<script setup lang="ts">
import { computed, ref } from 'vue';

interface CandidateRow {
  id: number;
  candidateCode: string;
  candidate: string;
  role: string;
}

const currentPage = ref(1);
const selectedKeys = ref<string[]>([]);
const pageSize = 2;
const candidates: CandidateRow[] = [
  {
    id: 101,
    candidateCode: 'C-101',
    candidate: 'Avery Kim',
    role: 'Product designer',
  },
  {
    id: 102,
    candidateCode: 'C-102',
    candidate: 'Riley Chen',
    role: 'Frontend engineer',
  },
  {
    id: 103,
    candidateCode: 'C-103',
    candidate: 'Morgan Lee',
    role: 'Data analyst',
  },
  {
    id: 104,
    candidateCode: 'C-104',
    candidate: 'Jordan Patel',
    role: 'Product manager',
  },
];
const pageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return candidates.slice(start, start + pageSize);
});
</script>

<template>
  <div class="table-cross-page-demo">
    <h-table :data="pageData" height="300">
      <h-table-column
        v-model:selected-keys="selectedKeys"
        type="selection"
        column-key="candidateCode"
        reserve-selection
        multiple
        width="48"
        align="center"
      />
      <h-table-column title="Candidate" field="candidate" min-width="170" />
      <h-table-column title="Role" field="role" min-width="170" />

      <template #selection-footer-text="{ selectedCount, currentSelectedCount }">
        <span>{{ selectedCount }} candidates selected</span>
        <span>{{ currentSelectedCount }} on this page</span>
      </template>

      <template #selection-footer-append>
        <h-pagination
          v-model:current-page="currentPage"
          :total="candidates.length"
          :page-size="pageSize"
          type="simple"
        />
      </template>
    </h-table>
  </div>
</template>

<style scoped>
.table-cross-page-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}
</style>
