<script setup lang="ts">
import { computed, ref } from 'vue';

const activeKey = ref('brief');
const documents = [
  { key: 'brief', label: 'Brief', fullLabel: 'Customer onboarding research brief' },
  { key: 'journey', label: 'Journey map', fullLabel: 'Enterprise onboarding journey map' },
  { key: 'findings', label: 'Top findings', fullLabel: 'Findings from customer interviews' },
  {
    key: 'recommendations',
    label: 'Recommendations…',
    fullLabel: 'Recommended experiments for the next iteration',
  },
];
const activeDocument = computed(
  () => documents.find(document => document.key === activeKey.value)!,
);
</script>

<template>
  <div class="tabs-overflow-demo">
    <h-tabs v-model:active-key="activeKey">
      <h-tab v-for="document in documents" :key="document.key">
        <template #default>
          <h-tooltip :content="document.fullLabel" placement="bottom">
            <span class="tabs-overflow-demo__label">{{ document.label }}</span>
          </h-tooltip>
        </template>
      </h-tab>
    </h-tabs>
    <p aria-live="polite">{{ activeDocument.fullLabel }}</p>
  </div>
</template>

<style scoped>
.tabs-overflow-demo {
  display: grid;
  min-width: 0;
  max-width: 620px;
  gap: var(--h-spacing-4);
}

.tabs-overflow-demo__label {
  display: block;
  max-width: 118px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tabs-overflow-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 520px) {
  .tabs-overflow-demo__label {
    max-width: 88px;
  }
}
</style>
