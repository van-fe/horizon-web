<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="datetimeRange" single-trigger />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateRange" single-trigger placeholder="Do Not Link Panels" :is-link-panels="false" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="dateRange" single-trigger single-panel placeholder="Single Panel" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const value = ref();
const value2 = ref<[Dayjs, Dayjs]>([dayjs().subtract(1, 'month'), dayjs().add(4, 'month')]);
const value3 = ref();
</script>
