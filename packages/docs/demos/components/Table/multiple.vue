<script setup lang="ts">
import { ref } from 'vue';

interface CandidateRow {
  id: string;
  candidate: string;
  role: string;
  score: number;
  consent: boolean;
}

const selectedKeys = ref<string[]>([]);
const candidates: CandidateRow[] = [
  { id: 'C-101', candidate: 'Avery Kim', role: 'Product designer', score: 92, consent: true },
  { id: 'C-102', candidate: 'Riley Chen', role: 'Frontend engineer', score: 89, consent: true },
  { id: 'C-103', candidate: 'Morgan Lee', role: 'Data analyst', score: 87, consent: true },
  { id: 'C-104', candidate: 'Jordan Patel', role: 'Product manager', score: 94, consent: false },
  { id: 'C-105', candidate: 'Casey Smith', role: 'Researcher', score: 86, consent: true },
];

function isSelectable(row: CandidateRow) {
  return row.consent;
}
</script>

<template>
  <div class="table-multiple-demo">
    <h-table :data="candidates" row-key="id">
      <h-table-column
        v-model:selected-keys="selectedKeys"
        type="selection"
        column-key="id"
        multiple
        width="48"
        align="center"
        :selectable="isSelectable"
      />
      <h-table-column title="Candidate" field="candidate" min-width="170" />
      <h-table-column title="Role" field="role" min-width="170" />
      <h-table-column title="Score" field="score" width="88" align="right" header-align="right" />
      <h-table-column title="Consent" width="106">
        <template #default="{ row }">
          <h-tag :type="row.consent ? 'success' : 'warning'" plain>
            {{ row.consent ? 'Eligible' : 'Missing' }}
          </h-tag>
        </template>
      </h-table-column>
    </h-table>
    <p aria-live="polite">Selected: {{ selectedKeys.length }}</p>
  </div>
</template>

<style scoped>
.table-multiple-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-multiple-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
