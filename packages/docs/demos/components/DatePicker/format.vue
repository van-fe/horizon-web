<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const format = ref('YYYY-MM-DD');
const value = ref(dayjs('2026-08-12'));
</script>

<template>
  <section class="date-picker-format">
    <h-segmented v-model:active-key="format" size="small">
      <h-segmented-item key="YYYY-MM-DD" label="ISO-like" />
      <h-segmented-item key="MMM D, YYYY" label="Readable" />
      <h-segmented-item key="X" label="Unix" />
    </h-segmented>
    <h-date-picker v-model="value" type="date" :format="format" />
  </section>
</template>

<style scoped>
.date-picker-format {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-format :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-format {
    inline-size: 100%;
  }
}
</style>
