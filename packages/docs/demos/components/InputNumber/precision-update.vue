<script setup lang="ts">
import { computed, ref } from 'vue';

type PrecisionKey = '0' | '2' | '4';

const precisionKey = ref<PrecisionKey>('2');
const precision = computed(() => Number(precisionKey.value));
const numericValue = ref<number | string>(1234.5678);
const stringValue = ref('1234.5678');
</script>

<template>
  <section class="input-number-precision-update-demo">
    <h-segmented
      v-model:active-key="precisionKey"
      size="small"
      block
      aria-label="Decimal precision"
    >
      <h-segmented-item value="0" label="0 places" />
      <h-segmented-item value="2" label="2 places" />
      <h-segmented-item value="4" label="4 places" />
    </h-segmented>
    <div>
      <label>
        <span>Number</span>
        <h-input-number
          v-model="numericValue"
          :precision="precision"
          :step="0.0001"
          aria-label="Numeric rate"
        />
        <small>{{ typeof numericValue }}</small>
      </label>
      <label>
        <span>String mode</span>
        <h-input-number
          v-model="stringValue"
          :precision="precision"
          :step="0.0001"
          string-mode
          aria-label="String rate"
        />
        <small>{{ typeof stringValue }}</small>
      </label>
    </div>
  </section>
</template>

<style scoped>
.input-number-precision-update-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.input-number-precision-update-demo > div {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.input-number-precision-update-demo label {
  display: grid;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
}

.input-number-precision-update-demo span,
.input-number-precision-update-demo small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .input-number-precision-update-demo > div {
    grid-template-columns: 1fr;
  }
}
</style>
