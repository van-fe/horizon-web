<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker v-model="value" readonly />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="values" readonly type="dateRange" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const value = ref(dayjs());
const values = ref([dayjs(), dayjs().add(1, 'day')]);
</script>
