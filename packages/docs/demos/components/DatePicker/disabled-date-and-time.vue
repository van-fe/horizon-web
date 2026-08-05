<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const start = dayjs().add(1, 'day').hour(10).minute(30);
const value = ref([start, start.add(90, 'minute')]);

function disabledDate(date: Dayjs) {
  return date.isBefore(dayjs(), 'day') || date.isAfter(dayjs().add(14, 'day'), 'day');
}

function disabledTime(time: Dayjs) {
  const minutes = time.hour() * 60 + time.minute();
  return minutes < 9 * 60 + 30 || minutes > 18 * 60;
}
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker
      v-model="value"
      type="datetime-range"
      :disabled-date="disabledDate"
      :begin-disabled-time="disabledTime"
      :end-disabled-time="disabledTime"
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
