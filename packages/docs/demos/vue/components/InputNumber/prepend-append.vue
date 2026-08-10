<script setup lang="ts">
import { ref } from 'vue';

const value = ref(4800);
const currency = ref('USD');
</script>

<template>
  <label class="input-number-group-demo">
    <span>Monthly service budget</span>
    <h-input-number v-model="value" :min="0" :step="100" aria-label="Monthly budget">
      <template #prepend>
        <h-select v-model="currency" aria-label="Budget currency">
          <h-option label="USD" value="USD" />
          <h-option label="EUR" value="EUR" />
          <h-option label="CNY" value="CNY" />
        </h-select>
      </template>
      <template #append>per month</template>
    </h-input-number>
  </label>
</template>

<style scoped>
.input-number-group-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 560px;
}

.input-number-group-demo > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.input-number-group-demo :deep(.h-input-number__group--prepend .h-select) {
  inline-size: 88px;
}
</style>
