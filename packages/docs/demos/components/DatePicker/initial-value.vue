<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const value = ref<unknown>(dayjs().add(1, 'day'));

function describe(modelValue: unknown) {
  if (modelValue === null) return 'null';
  if (modelValue === undefined) return 'undefined';
  return 'Dayjs value';
}
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker v-model="value" type="date" :initial-value="null" />
    <code aria-live="polite">Model: {{ describe(value) }}</code>
  </section>
</template>

<style scoped>
.date-picker-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-demo code {
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .date-picker-demo {
    inline-size: 100%;
  }
}
</style>
