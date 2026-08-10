<script setup lang="ts">
import { ref } from 'vue';

const value = ref(1840);
</script>

<template>
  <label class="input-number-disabled-demo">
    <span>ERP subtotal</span>
    <h-input-number v-model="value" disabled :min="0" aria-label="ERP subtotal">
      <template #prefix>$</template>
    </h-input-number>
    <small>Locked by the ERP synchronization policy</small>
  </label>
</template>

<style scoped>
.input-number-disabled-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.input-number-disabled-demo > span,
.input-number-disabled-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
