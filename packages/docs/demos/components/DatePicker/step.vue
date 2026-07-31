<template>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="2">Time:</h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value" type="datetime" :time-step="60" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue" type="datetimeRange" :time-step="60" />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="2">Minute:</h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="dateMinutes" :hour-step="3" :minute-step="5" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue2" type="dateMinutesRange" :hour-step="3" :minute-step="5" />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="2">Second:</h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value3" type="dateSeconds" :hour-step="3" :minute-step="5" :second-step="10" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue3" type="dateSecondsRange" :hour-step="3" :minute-step="5" :second-step="10" />
    </h-grid-item>
  </h-grid>
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
