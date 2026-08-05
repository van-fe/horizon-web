<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const appointment = ref(dayjs().add(1, 'day').hour(10).minute(30));

function showDateTooltip(date: Dayjs) {
  return { show: true, content: date.format('dddd · YYYY-MM-DD') };
}

function showMonthTooltip(month: Dayjs) {
  return { show: true, content: `${month.daysInMonth()} days` };
}

function showYearTooltip(year: Dayjs) {
  const leapYear = (year.year() % 4 === 0 && year.year() % 100 !== 0) || year.year() % 400 === 0;
  return { show: leapYear, content: leapYear ? 'Leap year' : undefined };
}

function showTimeTooltip(time: Dayjs) {
  const businessHour = time.hour() >= 9 && time.hour() <= 18;
  return { show: businessHour, content: businessHour ? 'Business hours' : undefined };
}
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker
      v-model="appointment"
      type="datetime"
      :show-date-tooltip="showDateTooltip"
      :show-month-tooltip="showMonthTooltip"
      :show-year-tooltip="showYearTooltip"
      :show-time-tooltip="showTimeTooltip"
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
