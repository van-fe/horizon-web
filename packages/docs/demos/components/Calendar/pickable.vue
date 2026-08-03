<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const value = ref(dayjs().format('YYYY-MM-DD'));
const status = ref('Weekends are unavailable');

function onDateClick(date: string) {
  status.value = `Selected ${date}`;
}

function disableDate(date: Dayjs) {
  return [0, 6].includes(date.day());
}
</script>

<template>
  <div class="calendar-pickable-demo">
    <p aria-live="polite">{{ status }}</p>
    <div class="calendar-pickable-demo-viewport">
      <h-calendar
        v-model="value"
        mode="month"
        pickable
        auto-fit
        :disable-date="disableDate"
        @date-click="onDateClick"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar-pickable-demo {
  display: grid;
  gap: var(--h-spacing-3);
  min-width: 0;
}

.calendar-pickable-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}

.calendar-pickable-demo-viewport {
  min-width: 0;
  height: min(72vh, 640px);
  min-height: 540px;
  overflow: auto;
}

@media (width <= 520px) {
  .calendar-pickable-demo-viewport {
    height: 520px;
    min-height: 0;
  }
}
</style>
