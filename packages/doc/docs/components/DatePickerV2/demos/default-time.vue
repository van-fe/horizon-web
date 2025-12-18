<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker v-model="value" type="datetime" :default-time="defaultTime" :need-confirm="true" />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value2" type="dateMinutesRange" :default-time="defaultTimes" />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value3" type="dateRange" :default-time="defaultTimes" format="YYYY-MM-DD HH:mm:ss" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
const value3 = ref();

const defaultTime = '20:00';
const defaultTimes = ['00:00:00', '23:59:59'];
</script>
