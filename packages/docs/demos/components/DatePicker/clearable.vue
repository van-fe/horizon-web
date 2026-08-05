<script setup lang="ts">
import { ref } from 'vue';

const reviewDate = ref('2026-08-14');
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker v-model="reviewDate" type="date" clearable />
    <p aria-live="polite">{{ reviewDate || 'Review date cleared' }}</p>
  </section>
</template>

<style scoped>
.date-picker-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .date-picker-demo {
    inline-size: 100%;
  }
}
</style>
