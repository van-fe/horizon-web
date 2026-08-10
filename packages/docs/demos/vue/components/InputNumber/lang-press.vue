<script setup lang="ts">
import { ref } from 'vue';

const value = ref(24);
</script>

<template>
  <label class="input-number-long-press-demo">
    <span>Label quantity</span>
    <h-input-number
      v-model="value"
      :min="0"
      :max="500"
      enable-lang-press
      :lang-press-frequency="120"
      aria-label="Label quantity"
    />
    <small aria-live="polite">Press and hold a step control · {{ value }}</small>
  </label>
</template>

<style scoped>
.input-number-long-press-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.input-number-long-press-demo > span,
.input-number-long-press-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
