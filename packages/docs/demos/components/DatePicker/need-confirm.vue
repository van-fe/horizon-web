<template>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Year:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value1" type="year" need-confirm />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue1" type="year-range" need-confirm />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Month:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="month" need-confirm />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue2" type="month-range" need-confirm />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Week:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value3" type="week" format="[week] ww" need-confirm />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Date:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value4" type="date" need-confirm />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue4" type="date-range" need-confirm />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Datetime:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value5" type="datetime" need-confirm />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue5" type="datetime-range" need-confirm />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      DateMinutes:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value6" type="date-minutes" need-confirm />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue6" type="date-minutes-range" need-confirm />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      DateSeconds:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value7" type="date-seconds" need-confirm />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue7" type="date-seconds-range" need-confirm />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const rangeValue1 = ref();
const value2 = ref();
const rangeValue2 = ref();
const value3 = ref(new Date);
const value4 = ref();
const rangeValue4 = ref();
const value5 = ref();
const rangeValue5 = ref();
const value6 = ref();
const rangeValue6 = ref();
const value7 = ref();
const rangeValue7 = ref();
</script>
