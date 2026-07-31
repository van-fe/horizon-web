<template>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Datetime:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value" type="datetime" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue" type="datetime-range" />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      DateMinutes:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="date-minutes" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue2" type="date-minutes-range" />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      DateSeconds:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value3" type="date-seconds" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue3" type="date-seconds-range" />
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
