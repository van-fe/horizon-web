<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-date-picker v-model="value" readonly />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="values" readonly type="dateRange" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const value = ref(dayjs());
const values = ref([dayjs(), dayjs().add(1, 'day')]);
</script>
