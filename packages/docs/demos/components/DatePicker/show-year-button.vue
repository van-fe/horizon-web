<script setup lang="ts">
import { ref } from 'vue';

const showYearButton = ref(false);
const value = ref('2026-08-12');
</script>

<template>
  <section class="date-picker-option">
    <h-switch v-model="showYearButton" label="Allow year navigation" />
    <h-date-picker v-model="value" type="date" :show-year-button="showYearButton" />
  </section>
</template>

<style scoped>
.date-picker-option {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-option :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-option {
    inline-size: 100%;
  }
}
</style>
