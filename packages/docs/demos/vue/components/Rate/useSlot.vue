<script setup lang="ts">
import { ref } from 'vue';

const level = ref(3);
</script>

<template>
  <div class="rate-demo">
    <h-rate v-model="level" size="large">A</h-rate>
    <span aria-live="polite">{{ level }} / 5</span>
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
