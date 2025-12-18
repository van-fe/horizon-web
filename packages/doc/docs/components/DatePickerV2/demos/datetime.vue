<template>
  <n-row align="middle">
    <n-col :span="4">
      Datetime:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value" type="datetime" />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue" type="datetime-range" />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      DateMinutes:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value2" type="date-minutes" />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue2" type="date-minutes-range" />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      DateSeconds:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value3" type="date-seconds" />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue3" type="date-seconds-range" />
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
