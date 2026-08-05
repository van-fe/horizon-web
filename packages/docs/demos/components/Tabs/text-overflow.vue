<script setup lang="ts">
import { computed, ref } from 'vue';

const activeKey = ref('brief');
const documents = [
  { key: 'brief', label: 'Customer onboarding research brief' },
  { key: 'journey', label: 'Enterprise onboarding journey map' },
  { key: 'findings', label: 'Findings from customer interviews' },
  {
    key: 'recommendations',
    label: 'Recommended experiments for the next iteration',
  },
];
const activeDocument = computed(
  () => documents.find(document => document.key === activeKey.value)!,
);
</script>

<template>
  <div class="tabs-overflow-demo">
    <h-tabs v-model:active-key="activeKey">
      <h-tab v-for="document in documents" :key="document.key" :label="document.label" />
    </h-tabs>
    <p aria-live="polite">{{ activeDocument.label }}</p>
  </div>
</template>

<style scoped>
.tabs-overflow-demo {
  display: grid;
  min-width: 0;
  max-width: 620px;
  gap: var(--h-spacing-4);
}

.tabs-overflow-demo :deep(.h-tabs__tab) {
  min-width: 0;
  max-width: 118px;
}

.tabs-overflow-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 520px) {
  .tabs-overflow-demo :deep(.h-tabs__tab) {
    max-width: 88px;
  }
}
</style>
