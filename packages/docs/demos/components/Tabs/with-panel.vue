<script setup lang="ts">
import { ref } from 'vue';

const activeKey = ref('adoption');
const panels = [
  { key: 'adoption', label: 'Adoption', detail: '142 of 184 members were active this week.' },
  { key: 'reliability', label: 'Reliability', detail: 'Two incidents stayed within the SLO.' },
  { key: 'support', label: 'Support', detail: 'Median first response was 38 minutes.' },
];
</script>

<template>
  <div class="tabs-panel-demo">
    <h-tabs v-model:active-key="activeKey">
      <h-tab v-for="panel in panels" :key="panel.key" :label="panel.label" />
    </h-tabs>
    <h-panels v-model="activeKey">
      <h-panel v-for="panel in panels" :key="panel.key" :name="panel.key">
        <p>{{ panel.detail }}</p>
      </h-panel>
    </h-panels>
  </div>
</template>

<style scoped>
.tabs-panel-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-panel-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
