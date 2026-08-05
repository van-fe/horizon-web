<script setup lang="ts">
import { ref } from 'vue';

type InputSize = 'small' | 'medium' | 'large';

const size = ref<InputSize>('medium');
const value = ref(24);
</script>

<template>
  <section class="input-number-size-demo">
    <h-segmented v-model:active-key="size" size="small" block aria-label="Input number size">
      <h-segmented-item value="small" label="Small" />
      <h-segmented-item value="medium" label="Medium" />
      <h-segmented-item value="large" label="Large" />
    </h-segmented>
    <h-input-number v-model="value" :size="size" :min="0" :aria-label="`${size} quantity`" />
    <small aria-live="polite">size="{{ size }}"</small>
  </section>
</template>

<style scoped>
.input-number-size-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 460px;
}

.input-number-size-demo > small {
  color: var(--h-text-secondary);
}
</style>
