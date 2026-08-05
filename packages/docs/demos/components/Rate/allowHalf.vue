<script setup lang="ts">
import { ref } from 'vue';

const score = ref(3.5);
</script>

<template>
  <div class="rate-demo">
    <h-rate v-model="score" half size="large" />
    <span aria-live="polite">{{ score.toFixed(1) }}</span>
  </div>
</template>

<style scoped>
.rate-demo {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-4);
}

.rate-demo span {
  color: var(--h-text-secondary);
  font-variant-numeric: tabular-nums;
}
</style>
