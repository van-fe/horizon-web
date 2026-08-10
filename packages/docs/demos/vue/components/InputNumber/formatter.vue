<script setup lang="ts">
import { ref } from 'vue';

const value = ref<number | string>(128500);

function formatter(nextValue: number | string) {
  const [integer, decimal] = String(nextValue).split('.');
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$ ${grouped}${decimal === undefined ? '' : `.${decimal}`}`;
}

function parser(nextValue: string) {
  return nextValue.replace(/[$,\s]/g, '');
}
</script>

<template>
  <label class="input-number-formatter-demo">
    <span>Annual budget</span>
    <h-input-number
      v-model="value"
      :min="0"
      :step="500"
      :formatter="formatter"
      :parser="parser"
      aria-label="Annual budget"
    />
    <small aria-live="polite">modelValue: {{ value }}</small>
  </label>
</template>

<style scoped>
.input-number-formatter-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.input-number-formatter-demo > span,
.input-number-formatter-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
