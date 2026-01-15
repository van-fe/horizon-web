<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" readonly />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="values" readonly type="dateRange" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const value = ref(dayjs());
const values = ref([dayjs(), dayjs().add(1, 'day')]);
</script>
