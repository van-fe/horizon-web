<script setup lang="ts">
import { computed, ref } from 'vue';

const activeKey = ref('incidents');
const views = [
  { key: 'incidents', label: 'Incidents', count: 3, detail: 'Three incidents need an owner.' },
  { key: 'changes', label: 'Changes', count: 8, detail: 'Eight changes are scheduled.' },
  { key: 'runbooks', label: 'Runbooks', count: 12, detail: 'Twelve runbooks are published.' },
];
const activeView = computed(() => views.find(view => view.key === activeKey.value)!);
</script>

<template>
  <div class="tabs-slot-demo">
    <h-tabs v-model:active-key="activeKey" type="card">
      <h-tab v-for="view in views" :key="view.key">
        <template #default="{ state }">
          <span class="tabs-slot-demo__label">
            {{ view.label }}
            <h-tag size="small" :type="state ? 'info' : 'normal'" plain>{{ view.count }}</h-tag>
          </span>
        </template>
      </h-tab>
    </h-tabs>
    <p aria-live="polite">{{ activeView.detail }}</p>
  </div>
</template>

<style scoped>
.tabs-slot-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-slot-demo__label {
  display: inline-flex;
  align-items: center;
  gap: var(--h-spacing-2);
}

.tabs-slot-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
