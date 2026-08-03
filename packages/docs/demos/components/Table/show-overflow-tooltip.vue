<script setup lang="ts">
const audits = [
  {
    time: '09:42',
    actor: 'Mina Park',
    action: 'Changed workspace retention',
    detail: 'Reduced analytics event retention from 24 months to 18 months for the APAC workspace.',
  },
  {
    time: '10:18',
    actor: 'Noah Chen',
    action: 'Rotated an access key',
    detail: 'Created a replacement key for the nightly warehouse synchronization.',
  },
  {
    time: '11:03',
    actor: 'Iris Wang',
    action: 'Updated export permissions',
    detail: 'Granted Finance Analysts permission to export approved billing reports.',
  },
];
</script>

<template>
  <h-table :data="audits" row-key="time" table-layout="fixed">
    <h-table-column title="Time" field="time" width="76" />
    <h-table-column title="Actor" field="actor" width="128" show-overflow-tooltip />
    <h-table-column title="Change" field="action" width="180" show-overflow-tooltip />
    <h-table-column title="Details" field="detail" width="240" show-overflow-tooltip />
  </h-table>
</template>
