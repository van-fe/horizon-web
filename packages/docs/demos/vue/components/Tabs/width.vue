<script setup lang="ts">
import { computed, ref } from 'vue';

const activeKey = ref('quality');
const steps = [
  { key: 'quality', label: 'Quality and readiness review', detail: 'Validate release checks.' },
  { key: 'rollout', label: 'Regional rollout plan', detail: 'Sequence availability by region.' },
  { key: 'follow-up', label: 'Post-launch follow-up', detail: 'Review remaining actions.' },
];
const activeStep = computed(() => steps.find(step => step.key === activeKey.value)!);
</script>

<template>
  <div class="tabs-width-demo">
    <h-tabs v-model:active-key="activeKey" type="page">
      <h-tab v-for="step in steps" :key="step.key" :label="step.label" />
    </h-tabs>
    <p aria-live="polite">{{ activeStep.detail }}</p>
  </div>
</template>

<style scoped>
.tabs-width-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-width-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
