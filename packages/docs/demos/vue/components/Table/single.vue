<script setup lang="ts">
import { ref } from 'vue';

interface WorkspaceRow {
  id: string;
  workspace: string;
  region: string;
  seats: number;
  available: boolean;
}

const selectedKey = ref<string>();
const workspaces: WorkspaceRow[] = [
  { id: 'WS-01', workspace: 'Commerce APAC', region: 'Singapore', seats: 184, available: true },
  { id: 'WS-02', workspace: 'Analytics EU', region: 'Frankfurt', seats: 96, available: false },
  { id: 'WS-03', workspace: 'Support AMER', region: 'Virginia', seats: 142, available: true },
  { id: 'WS-04', workspace: 'Research Labs', region: 'Tokyo', seats: 58, available: false },
  { id: 'WS-05', workspace: 'Partner Hub', region: 'Sydney', seats: 77, available: true },
];

function isSelectable(row: WorkspaceRow) {
  return row.available;
}
</script>

<template>
  <div class="table-single-demo">
    <h-table :data="workspaces" row-key="id" highlight-selected>
      <h-table-column
        v-model:selected-keys="selectedKey"
        type="selection"
        column-key="id"
        width="48"
        align="center"
        :selectable="isSelectable"
      />
      <h-table-column title="Workspace" field="workspace" min-width="180" />
      <h-table-column title="Region" field="region" min-width="130" />
      <h-table-column title="Seats" field="seats" width="86" align="right" header-align="right" />
      <h-table-column title="Eligibility" width="112">
        <template #default="{ row }">
          <h-tag :type="row.available ? 'success' : 'warning'" plain>
            {{ row.available ? 'Available' : 'Locked' }}
          </h-tag>
        </template>
      </h-table-column>
    </h-table>
    <p aria-live="polite">Selected: {{ selectedKey ?? 'none' }}</p>
  </div>
</template>

<style scoped>
.table-single-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-single-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
