<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const travelDate = ref(dayjs().add(3, 'day'));

function isWeekend(date: Dayjs) {
  return [0, 6].includes(date.day());
}

function showWeekendDot(date: Dayjs, panelType: 'day' | 'month' | 'year') {
  return panelType === 'day' && isWeekend(date);
}

function showWeekendTooltip(date: Dayjs) {
  return { show: isWeekend(date), content: isWeekend(date) ? 'Weekend' : undefined };
}
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker
      v-model="travelDate"
      :show-dot="showWeekendDot"
      :show-date-tooltip="showWeekendTooltip"
    />
  </section>
</template>

<style scoped>
.date-picker-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

@media (max-width: 390px) {
  .date-picker-demo {
    inline-size: 100%;
  }
}
</style>
