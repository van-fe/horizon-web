<script setup lang="ts">
const projects = [
  { id: 'PR-18', project: 'Billing refresh', owner: 'Mina Park', status: 'On track', progress: 72 },
  { id: 'PR-23', project: 'Search migration', owner: 'Noah Chen', status: 'At risk', progress: 48 },
  { id: 'PR-27', project: 'Audit exports', owner: 'Iris Wang', status: 'Done', progress: 100 },
  { id: 'PR-31', project: 'Role templates', owner: 'Leo Martin', status: 'On track', progress: 64 },
];
</script>

<template>
  <h-table :data="projects" row-key="id">
    <h-table-column title="Project" field="project" min-width="190" />
    <h-table-column title="Owner" field="owner" min-width="140" />
    <h-table-column title="Status" width="112">
      <template #default="{ row }">
        <h-tag
          :type="row.status === 'Done' ? 'success' : row.status === 'At risk' ? 'warning' : 'info'"
          plain
        >
          {{ row.status }}
        </h-tag>
      </template>
    </h-table-column>
    <h-table-column title="Progress" width="150">
      <template #default="{ row }">
        <div
          class="table-cell-slot-demo__progress"
          :aria-label="row.progress + ' percent complete'"
        >
          <i :style="{ width: row.progress + '%' }"></i>
          <span>{{ row.progress }}%</span>
        </div>
      </template>
    </h-table-column>
  </h-table>
</template>

<style scoped>
.table-cell-slot-demo__progress {
  position: relative;
  height: 20px;
  overflow: hidden;
  border-radius: var(--h-radius-pill);
  background: var(--h-bg-secondary);
}

.table-cell-slot-demo__progress i {
  display: block;
  height: 100%;
  background: var(--h-bg-brand-default);
}

.table-cell-slot-demo__progress span {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--h-text-primary);
  font-size: var(--h-text-sm);
}
</style>
