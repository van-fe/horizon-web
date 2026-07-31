<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-date-picker v-model="value" type="date" panel-show-date="2024-01-01" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="date-range" panel-show-date="2020-10-01" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value3" type="date-range" :panel-show-date="panelShowDate" :is-link-panels="false" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const value = ref();
const value2 = ref();
const value3 = ref();

const panelShowDate = [dayjs().set('year', 2000).set('month', 1), dayjs().set('month', 10)] as [Dayjs, Dayjs];
</script>
