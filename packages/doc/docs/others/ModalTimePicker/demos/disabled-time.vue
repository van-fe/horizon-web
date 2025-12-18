<template>
  <n-row>
    <n-col :span="6">
      <n-modal-time-picker v-model="value" :disabled-time="disabledTime" />
    </n-col>
    <n-col :span="6">
      <n-modal-time-picker v-model="value2" is-range :disabled-time="disabledTime" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const value = ref('08:50');
const value2 = ref();

function disabledTime(date: Dayjs) {
  return (
    date.isBefore(dayjs().set('hour', 9).set('minute', 30), 'minute') || date.isAfter(dayjs().set('hour', 18), 'hour')
  );
}
</script>
