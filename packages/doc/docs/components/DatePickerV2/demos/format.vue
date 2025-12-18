<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker v-model="value" type="date" format="X" />
    </n-col>
    <n-col :span="12">
      <n-date-picker v-model="value2" type="date-range" format="YYYY-MMM-DD [Quarter:] Q [week:] wo" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
