<template>
  <n-row align="middle">
    <n-col :span="2">Time:</n-col>
    <n-col :span="6">
      <n-modal-time-picker v-model="value" type="time" :time-step="60" />
    </n-col>
    <n-col :span="6">
      <n-modal-time-picker v-model="rangeValue" type="time" :time-step="60" is-range />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="2">Minute:</n-col>
    <n-col :span="6">
      <n-modal-time-picker v-model="value2" type="minutes" :hour-step="3" :minute-step="5" />
    </n-col>
    <n-col :span="6">
      <n-modal-time-picker v-model="rangeValue2" type="minutes" :hour-step="3" :minute-step="5" is-range />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="2">Second:</n-col>
    <n-col :span="6">
      <n-modal-time-picker v-model="value3" type="seconds" :hour-step="3" :minute-step="5" :second-step="10" />
    </n-col>
    <n-col :span="6">
      <n-modal-time-picker v-model="rangeValue3" type="seconds" :hour-step="3" :minute-step="5" :second-step="10" is-range />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
const value2 = ref();
const rangeValue2 = ref();
const value3 = ref();
const rangeValue3 = ref();
</script>
