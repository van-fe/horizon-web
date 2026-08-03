<script setup lang="ts">
import { computed, ref } from 'vue';

const activeKey = ref('details');
const tabs = [
  { key: 'details', label: 'Project details' },
  { key: 'terms', label: 'Terms' },
  { key: 'legal-hold', label: 'Legal hold', disabled: true },
  { key: 'history', label: 'History' },
];
const activeLabel = computed(() => tabs.find(tab => tab.key === activeKey.value)?.label);
</script>

<template>
  <div class="tabs-disabled-demo">
    <h-tabs v-model:active-key="activeKey">
      <h-tab v-for="tab in tabs" :key="tab.key" :label="tab.label" :disabled="tab.disabled" />
    </h-tabs>
    <p aria-live="polite">{{ activeLabel }} selected · Legal hold is unavailable.</p>
  </div>
</template>

<style scoped>
.tabs-disabled-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-disabled-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
