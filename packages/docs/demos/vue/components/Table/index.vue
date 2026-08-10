<script setup lang="ts">
const attendees = [
  { id: 'ATT-18', attendee: 'Mina Park', company: 'Northwind', track: 'Design systems' },
  { id: 'ATT-23', attendee: 'Noah Chen', company: 'Contoso', track: 'Platform' },
  { id: 'ATT-27', attendee: 'Iris Wang', company: 'Fabrikam', track: 'Product operations' },
  { id: 'ATT-31', attendee: 'Leo Martin', company: 'Globex', track: 'Security' },
];

function customIndex(index: number) {
  return 1001 + index * 10;
}
</script>

<template>
  <h-table :data="attendees" row-key="id">
    <h-table-column title="Badge" type="index" width="100" :index="customIndex" />
    <h-table-column title="Attendee" field="attendee" min-width="160" />
    <h-table-column title="Company" field="company" min-width="140" />
    <h-table-column title="Track" field="track" min-width="170" />
  </h-table>
</template>
