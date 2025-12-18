<template>
  <n-row>
    <n-col :span="6">
      <n-time-picker-v2 v-model="value" show-now />
    </n-col>
    <n-col :span="6">
      <n-time-picker-v2 v-model="value2" is-range show-now />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
