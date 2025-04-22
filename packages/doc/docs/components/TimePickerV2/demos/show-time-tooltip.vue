<template>
  <n-row>
    <n-col :span="6">
      <n-time-picker-v2 v-model="value" type="time" :show-time-tooltip="showTimeTooltip" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref();

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
