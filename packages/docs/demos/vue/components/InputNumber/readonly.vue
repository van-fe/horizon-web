<script setup lang="ts">
import { ref } from 'vue';

const value = ref(129.5);
</script>

<template>
  <label class="input-number-readonly-demo">
    <span>Approved hourly rate</span>
    <h-input-number
      v-model="value"
      readonly
      :min="0"
      :precision="2"
      aria-label="Approved hourly rate"
    >
      <template #prefix>$</template>
      <template #suffix>USD/hour</template>
    </h-input-number>
    <small>Read only · controls are hidden</small>
  </label>
</template>

<style scoped>
.input-number-readonly-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 460px;
}

.input-number-readonly-demo > span,
.input-number-readonly-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
