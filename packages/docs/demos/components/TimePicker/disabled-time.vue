<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-time-picker v-model="value" :disabled-time="disabledTime" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-time-picker v-model="value2" is-range :disabled-time="disabledTime" />
    </h-grid-item>
  </h-grid>
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
