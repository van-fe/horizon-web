<script setup lang="ts">
import { computed, ref } from 'vue';

const numberValue = ref<number | string | null>(1.2);
const stringValue = ref<string | null>('1.2000');
const numberModel = computed(() => `${typeof numberValue.value}: ${String(numberValue.value)}`);
const stringModel = computed(() => `${typeof stringValue.value}: ${String(stringValue.value)}`);
</script>

<template>
  <section class="input-number-zero-demo" aria-label="Trailing zero model comparison">
    <label>
      <span>Number model</span>
      <h-input-number
        v-model="numberValue"
        :precision="4"
        :step="0.0001"
        aria-label="Numeric decimal model"
      />
      <small aria-live="polite">{{ numberModel }}</small>
    </label>
    <label>
      <span>String model</span>
      <h-input-number
        v-model="stringValue"
        :precision="4"
        :step="0.0001"
        string-mode
        aria-label="String decimal model"
      />
      <small aria-live="polite">{{ stringModel }}</small>
    </label>
  </section>
</template>

<style scoped>
.input-number-zero-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.input-number-zero-demo label {
  display: grid;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
}

.input-number-zero-demo span,
.input-number-zero-demo small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .input-number-zero-demo {
    grid-template-columns: 1fr;
  }
}
</style>
