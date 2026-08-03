<script setup lang="ts">
const metrics = [
  { metric: 'Activation rate', current: '64.8%', target: '68.0%', owner: 'Growth' },
  {
    metric: 'Net revenue retention',
    current: '112.4%',
    target: '115.0%',
    owner: 'Customer success',
  },
  { metric: 'P95 API latency', current: '184 ms', target: '< 200 ms', owner: 'Platform' },
  { metric: 'Support first response', current: '38 min', target: '< 45 min', owner: 'Operations' },
];
</script>

<template>
  <h-table :data="metrics" row-key="metric" stripe>
    <h-table-column
      title="Metric"
      field="metric"
      min-width="210"
      tip="The primary outcome reviewed in the quarterly operating meeting."
    />
    <h-table-column
      title="Current"
      field="current"
      width="120"
      align="right"
      header-align="right"
      tip="Latest complete reporting period."
    />
    <h-table-column
      title="Target"
      field="target"
      width="120"
      align="right"
      header-align="right"
      tip="Approved quarterly objective."
    />
    <h-table-column title="Owner" field="owner" min-width="150" />
  </h-table>
</template>
