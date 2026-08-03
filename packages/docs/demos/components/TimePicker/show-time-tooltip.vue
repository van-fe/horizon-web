<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-time-picker v-model="value" type="time" :show-time-tooltip="showTimeTooltip" />
    </h-grid-item>
  </h-grid>
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
