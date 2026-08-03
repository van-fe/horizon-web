<script setup lang="ts">
import { ref } from 'vue';

type InputSize = 'small' | 'medium' | 'large';

const size = ref<InputSize>('medium');
const value = ref('Quarterly renewal review');
</script>

<template>
  <section class="input-size-demo">
    <h-segmented v-model:active-key="size" size="small" block aria-label="Input size">
      <h-segmented-item key="small" label="Small" />
      <h-segmented-item key="medium" label="Medium" />
      <h-segmented-item key="large" label="Large" />
    </h-segmented>
    <h-input v-model="value" :size="size" :aria-label="`${size} input`" />
    <small aria-live="polite">size="{{ size }}"</small>
  </section>
</template>

<style scoped>
.input-size-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 560px;
}

.input-size-demo > small {
  color: var(--h-text-secondary);
}
</style>
