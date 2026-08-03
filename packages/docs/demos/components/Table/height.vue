<script setup lang="ts">
const jobs = Array.from({ length: 14 }, (_, index) => ({
  id: `JOB-${4100 + index}`,
  workflow: ['Daily warehouse sync', 'Invoice reconciliation', 'Search index refresh'][index % 3],
  started: `${String(8 + Math.floor(index / 4)).padStart(2, '0')}:${String((index * 13) % 60).padStart(2, '0')}`,
  duration: `${18 + index * 3}s`,
  result: index % 5 === 0 ? 'Review' : 'Complete',
}));
</script>

<template>
  <h-table :data="jobs" height="280" row-key="id" stripe>
    <h-table-column title="Run" field="id" width="108" />
    <h-table-column title="Workflow" field="workflow" min-width="210" />
    <h-table-column title="Started" field="started" width="94" />
    <h-table-column
      title="Duration"
      field="duration"
      width="96"
      align="right"
      header-align="right"
    />
    <h-table-column title="Result" width="104">
      <template #default="{ row }">
        <h-tag :type="row.result === 'Complete' ? 'success' : 'warning'" plain>
          {{ row.result }}
        </h-tag>
      </template>
    </h-table-column>
  </h-table>
</template>
