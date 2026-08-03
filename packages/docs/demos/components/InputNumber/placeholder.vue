<script setup lang="ts">
import { ref } from 'vue';

const value = ref<number | null>(null);
</script>

<template>
  <label class="input-number-placeholder-demo">
    <span>Dedicated desks</span>
    <h-input-number
      v-model="value"
      :min="0"
      placeholder="Use occupancy forecast"
      aria-label="Dedicated desk count"
    />
  </label>
</template>

<style scoped>
.input-number-placeholder-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.input-number-placeholder-demo > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
