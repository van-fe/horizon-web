<template>
  <h-row align="middle">
    <h-col :span="2">Time:</h-col>
    <h-col :span="6">
      <h-time-picker v-model="value" type="time" :time-step="60" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="rangeValue" type="time" :time-step="60" is-range />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="2">Minute:</h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" type="minutes" :hour-step="3" :minute-step="5" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="rangeValue2" type="minutes" :hour-step="3" :minute-step="5" is-range />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="2">Second:</h-col>
    <h-col :span="6">
      <h-time-picker v-model="value3" type="seconds" :hour-step="3" :minute-step="5" :second-step="10" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="rangeValue3" type="seconds" :hour-step="3" :minute-step="5" :second-step="10" is-range />
    </h-col>
  </h-row>
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
