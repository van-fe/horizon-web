<script setup lang="ts">
import { ref } from 'vue';

const value = ref(1.5);
</script>

<template>
  <label class="input-number-range-demo">
    <span>Session length</span>
    <h-input-number
      v-model="value"
      :min="0.5"
      :max="8"
      :step="0.5"
      :precision="1"
      step-strictly
      aria-label="Session length from 0.5 to 8 hours"
    >
      <template #suffix>hr</template>
    </h-input-number>
    <small aria-live="polite">0.5–8 hours · strict 0.5 steps · {{ value }}</small>
  </label>
</template>

<style scoped>
.input-number-range-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.input-number-range-demo > span,
.input-number-range-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
