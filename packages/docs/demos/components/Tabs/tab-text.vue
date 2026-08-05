<script setup lang="ts">
import { computed, ref } from 'vue';

const activeKey = ref('all');
const filters = [
  { key: 'all', label: 'All', count: 24 },
  { key: 'open', label: 'Open', count: 8 },
  { key: 'review', label: 'In review', count: 5 },
  { key: 'done', label: 'Done', count: 11 },
];
const activeFilter = computed(() => filters.find(filter => filter.key === activeKey.value)!);
</script>

<template>
  <div class="tabs-text-demo">
    <h-tabs v-model:active-key="activeKey" size="small" :underline="false" :indicator="false">
      <h-tab v-for="filter in filters" :key="filter.key">
        <template #default="{ state }">
          <h-tag size="small" :model-value="state" :clickable="false" :type="state ? 'info' : ''">
            {{ filter.label }} · {{ filter.count }}
          </h-tag>
        </template>
      </h-tab>
    </h-tabs>
    <p aria-live="polite">{{ activeFilter.count }} issues in {{ activeFilter.label }}.</p>
  </div>
</template>

<style scoped>
.tabs-text-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-text-demo :deep(.h-tabs) {
  --h-tabs-spacing-tab-line-gap-small: var(--h-spacing-2);
}

.tabs-text-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
