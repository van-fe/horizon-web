<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker-v2
        v-model="value"
        type="datetime"
        :show-date-tooltip="showDateTooltip"
        :show-month-tooltip="showMonthTooltip"
        :show-year-tooltip="showYearTooltip"
        :show-time-tooltip="showTimeTooltip"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref();

function showDateTooltip(date: Dayjs) {
  return {
    show: true,
    content: date.format('YYYY-MM-DD'),
  };
}

function showMonthTooltip(month: Dayjs) {
  return {
    show: true,
    content: `${month.daysInMonth()} Days`,
  };
}

function showYearTooltip(year: Dayjs) {
  const isLoopYear = (year.year() % 4 === 0 && year.year() % 100 !== 0) || year.year() % 400 === 0;
  return {
    show: isLoopYear,
    content: isLoopYear ? 'Loop Year' : undefined,
  };
}

function showTimeTooltip(time: Dayjs) {
  if (time.hour() < 9 || time.hour() > 20) {
    return {
      show: false,
    };
  }

  return {
    show: true,
    content: 'Working hours',
  };
}
</script>
