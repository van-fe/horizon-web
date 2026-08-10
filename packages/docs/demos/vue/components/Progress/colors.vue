<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <h-slider v-model="percentage" :min="0" :max="100" :step="10" input-enable />
    </div>

    <div class="progress-list">
      <div v-for="item in examples" :key="item.label">
        <span>{{ item.label }}</span>
        <h-progress :percentage="percentage" :color="item.color" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const percentage = ref(40);
const steppedColors = [
  { color: 'var(--h-bg-error-default)', percentage: 20 },
  { color: 'var(--h-bg-warning-default)', percentage: 40 },
  { color: 'var(--h-bg-success-default)', percentage: 60 },
  { color: 'var(--h-bg-brand-default)', percentage: 100 },
];
const colorByProgress = (value: number) => {
  if (value < 30) return 'var(--h-bg-tertiary)';
  if (value < 70) return 'var(--h-bg-warning-default)';
  return 'var(--h-bg-success-default)';
};
const examples = [
  { label: 'Single', color: 'var(--h-bg-brand-default)' },
  { label: 'Function', color: colorByProgress },
  { label: 'Steps', color: steppedColors },
];
</script>

<style scoped>
.docs-demo__controls {
  display: grid;
}

.progress-list {
  display: grid;
  gap: var(--h-spacing-4);
}

.progress-list > div {
  display: grid;
  gap: var(--h-spacing-2);
}

.progress-list span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
