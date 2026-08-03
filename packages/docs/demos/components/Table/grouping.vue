<script setup lang="ts">
const initiatives = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  department: ['Platform', 'Growth', 'Design'][index % 3],
  role: ['Lead', 'Contributor'][index % 2],
  initiative: `${['Reliability', 'Activation', 'Accessibility', 'Insights'][index % 4]} workstream ${index + 1}`,
  budget: 12000 + (index % 6) * 1750,
  progress: 52 + (index % 8) * 6,
}));
</script>

<template>
  <h-table
    :data="initiatives"
    row-key="id"
    :group-by="['department', 'role']"
    :aggregations="{ budget: 'sum', progress: 'average' }"
    height="360"
  >
    <h-table-column title="Department" field="department" min-width="150" />
    <h-table-column title="Role" field="role" min-width="130" />
    <h-table-column title="Initiative" field="initiative" min-width="200" />
    <h-table-column title="Budget" field="budget" width="116" align="right" header-align="right" />
    <h-table-column
      title="Progress"
      field="progress"
      width="116"
      align="right"
      header-align="right"
    />
  </h-table>
</template>
