<template>
  <section class="docs-demo">
    <div class="plate-stage">
      <h-license-plate-input v-model="plate" aria-label="Vehicle license plate" />
      <output class="docs-demo__value">{{ plate || 'No plate entered' }}</output>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const plate = ref('京A12345');
</script>

<style scoped>
.plate-stage {
  display: grid;
  gap: var(--h-spacing-3);
  place-items: start;
}
</style>
