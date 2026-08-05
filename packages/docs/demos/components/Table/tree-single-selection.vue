<script setup lang="ts">
import { ref } from 'vue';

const checkStrictly = ref(false);
const selectedTeam = ref<string>();
const teams = [
  {
    id: 'product',
    team: 'Product',
    lead: 'Mina Park',
    members: 28,
    children: [
      { id: 'design', team: 'Product design', lead: 'Iris Wang', members: 11, children: [] },
      { id: 'research', team: 'Research', lead: 'Avery Kim', members: 7, children: [] },
    ],
  },
  {
    id: 'engineering',
    team: 'Engineering',
    lead: 'Noah Chen',
    members: 64,
    children: [
      { id: 'platform', team: 'Platform', lead: 'Leo Martin', members: 22, children: [] },
      { id: 'frontend', team: 'Frontend', lead: 'Riley Chen', members: 18, children: [] },
    ],
  },
];
</script>

<template>
  <div class="table-tree-single-demo">
    <h-switch v-model="checkStrictly" label="Check strictly" status />
    <h-table :data="teams" row-key="id" height="340" default-expand-all>
      <h-table-column
        v-model:selected-keys="selectedTeam"
        type="selection"
        column-key="id"
        width="48"
        align="center"
        :check-strictly="checkStrictly"
      />
      <h-table-column title="Team" field="team" min-width="190" />
      <h-table-column title="Lead" field="lead" min-width="145" />
      <h-table-column
        title="Members"
        field="members"
        width="104"
        align="right"
        header-align="right"
      />
    </h-table>
    <p aria-live="polite">Selected team: {{ selectedTeam || 'none' }}.</p>
  </div>
</template>

<style scoped>
.table-tree-single-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-tree-single-demo > .h-switch {
  justify-self: start;
}

.table-tree-single-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
