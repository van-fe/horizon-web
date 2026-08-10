<script setup lang="ts">
import { computed, ref } from 'vue';

type PrecisionKey = '0' | '2' | '4';

const precisionKey = ref<PrecisionKey>('2');
const precision = computed(() => Number(precisionKey.value));
const step = computed(() => (precision.value === 0 ? 1 : 10 ** -precision.value));
const value = ref(12.3456);
</script>

<template>
  <section class="input-number-precision-demo">
    <h-segmented
      v-model:active-key="precisionKey"
      size="small"
      block
      aria-label="Numeric precision"
    >
      <h-segmented-item value="0" label="Integer" />
      <h-segmented-item value="2" label="Currency" />
      <h-segmented-item value="4" label="Measurement" />
    </h-segmented>
    <h-input-number
      v-model="value"
      :precision="precision"
      :step="step"
      :aria-label="`${precision} decimal places`"
    />
    <small aria-live="polite">precision="{{ precision }}"</small>
  </section>
</template>

<style scoped>
.input-number-precision-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 460px;
}

.input-number-precision-demo > small {
  color: var(--h-text-secondary);
}
</style>
