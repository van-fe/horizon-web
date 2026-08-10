<script setup lang="ts">
import { ref } from 'vue';

const value = ref<number | null>(12);
const status = ref('Configured');
</script>

<template>
  <label class="input-number-clearable-demo">
    <span>Optional safety stock</span>
    <h-input-number
      v-model="value"
      clearable
      :min="0"
      placeholder="Automatic"
      aria-label="Optional safety stock"
      @clear="status = 'Cleared; automatic policy applies'"
    />
    <small aria-live="polite">{{ status }} · modelValue: {{ value ?? 'null' }}</small>
  </label>
</template>

<style scoped>
.input-number-clearable-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.input-number-clearable-demo > span,
.input-number-clearable-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
