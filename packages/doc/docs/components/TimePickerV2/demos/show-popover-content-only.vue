<template>
  <n-row>
    <n-col :span="6">
      <n-time-picker v-model="value" :show-popover-content-only="true" />
    </n-col>
    <n-col :span="6">
      <n-time-picker v-model="value2" is-range :show-popover-content-only="true" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
