<script setup lang="ts">
import { ref } from 'vue';

const activeKey = ref('summary');
const status = ref('Q3 summary is ready.');
const reports = [
  { key: 'summary', label: 'Q3 summary' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'retention', label: 'Retention' },
  { key: 'pipeline', label: 'Pipeline' },
];

function refresh() {
  const label = reports.find(report => report.key === activeKey.value)?.label;
  status.value = `${label} refreshed just now.`;
}
</script>

<template>
  <div class="tabs-extra-demo">
    <h-tabs v-model:active-key="activeKey">
      <h-tab v-for="report in reports" :key="report.key" :label="report.label" />
      <template #extra="{ size }">
        <h-button :size="size" @click="refresh">Refresh</h-button>
      </template>
    </h-tabs>
    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<style scoped>
.tabs-extra-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-extra-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
