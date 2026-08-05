<template>
  <section class="license-plate-inline-demo">
    <h-license-plate-input v-model="plate" inline-panel aria-label="Inline license plate input" />
    <p>Current value: {{ plate || 'Empty' }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const plate = ref('京A12345');
</script>

<style scoped>
.license-plate-inline-demo {
  display: grid;
  gap: var(--h-spacing-4);
  justify-items: start;
  max-width: 100%;
}

.license-plate-inline-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .license-plate-inline-demo {
    overflow-x: auto;
  }
}
</style>
