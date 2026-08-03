<template>
  <div class="docs-demo">
    <h-slider v-model="percentage" :min="0" :max="100" :step="10" input-enable />
    <h-progress type="circle" :percentage="percentage" :color="colorByProgress" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const percentage = ref(40);
const colorByProgress = (value: number) => {
  if (value < 30) return 'var(--h-bg-tertiary)';
  if (value < 70) return 'var(--h-bg-warning-default)';
  return 'var(--h-bg-success-default)';
};
</script>
