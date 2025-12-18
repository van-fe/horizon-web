<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker v-model="value" :disabled-date="disabledDate" />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value2" type="dateRange" :disabled-date="disabledDate" />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value3" type="datetime" :disabled-date="disabledDate" :disabled-time="disabledTime" />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value4" type="datetimeRange" :disabled-date="disabledDate" :begin-disabled-time="disabledTime" :end-disabled-time="disabledTime" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const value = ref(dayjs());
const value2 = ref();
const value3 = ref();
const value4 = ref();

function disabledDate(date: Dayjs) {
  return (
    date.isBefore(dayjs().startOf('week'), 'date') || date.isAfter(dayjs().add(7, 'days').endOf('week'), 'date')
  );
}

function disabledTime(time: Dayjs) {
  return (
    time.isBefore(dayjs().set('hour', 9).set('minute', 30), 'minute') || time.isAfter(dayjs().set('hour', 18), 'hour')
  );
}
</script>
