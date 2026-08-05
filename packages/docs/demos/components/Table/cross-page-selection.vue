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
const pageSize = 6;
const candidateNames = [
  'Avery Kim',
  'Riley Chen',
  'Morgan Lee',
  'Jordan Patel',
  'Taylor Nguyen',
  'Casey Brown',
  'Quinn Davis',
  'Cameron Wilson',
  'Reese Martinez',
  'Parker Anderson',
  'Rowan Thomas',
  'Skyler Moore',
  'Emerson Clark',
  'Finley Lewis',
  'Hayden Walker',
  'Dakota Hall',
  'Jamie Young',
  'Kendall Allen',
  'Alex King',
  'Drew Wright',
  'Robin Scott',
  'Sidney Green',
  'Ari Baker',
  'Blair Adams',
  'Charlie Nelson',
  'Devon Carter',
  'Ellis Mitchell',
  'Frankie Perez',
  'Gray Roberts',
  'Harper Turner',
  'Jules Phillips',
  'Kai Campbell',
  'Lane Parker',
  'Micah Evans',
  'Noel Edwards',
  'Oakley Collins',
];
const candidateRoles = [
  'Product designer',
  'Frontend engineer',
  'Data analyst',
  'Product manager',
  'Backend engineer',
  'UX researcher',
  'QA engineer',
  'DevOps engineer',
];
const candidates: CandidateRow[] = candidateNames.map((candidate, index) => {
  const id = 101 + index;
  return {
    id,
    candidateCode: `C-${id}`,
    candidate,
    role: candidateRoles[index % candidateRoles.length]!,
  };
});
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
