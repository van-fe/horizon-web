<template>
  <h-table
    :data="data"
    row-key="id"
    :group-by="['department', 'role']"
    :aggregations="{ budget: 'sum', progress: 'average' }"
    height="360"
    :virtual="{ itemSize: 45, buffer: 90 }"
  >
    <h-table-column title="Department" field="department" min-width="180" />
    <h-table-column title="Role" field="role" min-width="160" />
    <h-table-column title="Owner" field="owner" min-width="160" />
    <h-table-column title="Budget" field="budget" min-width="140" />
    <h-table-column title="Progress" field="progress" min-width="140" />
  </h-table>
</template>

<script setup lang="ts">
const departments = ['Platform', 'Growth', 'Design'];
const roles = ['Lead', 'Contributor'];
const data = Array.from({ length: 120 }, (_, id) => ({
  id,
  department: departments[id % departments.length],
  role: roles[id % roles.length],
  owner: `Member ${id + 1}`,
  budget: 1000 + (id % 10) * 125,
  progress: 55 + (id % 9) * 5,
}));
</script>
