<script setup lang="ts">
import { ref } from 'vue';

const firstDayOfWeek = ref(1);
const week = ref('2026-08-12');
</script>

<template>
  <section class="date-picker-first-day">
    <h-segmented v-model:active-key="firstDayOfWeek" size="small">
      <h-segmented-item :key="0" label="Sunday" />
      <h-segmented-item :key="1" label="Monday" />
      <h-segmented-item :key="6" label="Saturday" />
    </h-segmented>
    <h-date-picker
      v-model="week"
      type="week"
      :first-day-of-week="Number(firstDayOfWeek)"
      format="[Week] wo"
    />
  </section>
</template>

<style scoped>
.date-picker-first-day {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-first-day :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-first-day {
    inline-size: 100%;
  }
}
</style>
