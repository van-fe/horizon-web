<script setup lang="ts">
import { computed, ref } from 'vue';

const activeKey = ref('overview');
const sections = [
  { key: 'overview', label: 'Overview', detail: 'Workspace health and current notices.' },
  { key: 'activity', label: 'Activity', detail: 'Recent member and configuration changes.' },
  { key: 'members', label: 'Members', detail: '184 active members across 12 teams.' },
  { key: 'settings', label: 'Settings', detail: 'Identity and notification preferences.' },
];
const activeSection = computed(() => sections.find(section => section.key === activeKey.value)!);
</script>

<template>
  <div class="tabs-basic-demo">
    <h-tabs v-model:active-key="activeKey">
      <h-tab v-for="section in sections" :key="section.key" :label="section.label" />
    </h-tabs>
    <p aria-live="polite">{{ activeSection.detail }}</p>
  </div>
</template>

<style scoped>
.tabs-basic-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-basic-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
