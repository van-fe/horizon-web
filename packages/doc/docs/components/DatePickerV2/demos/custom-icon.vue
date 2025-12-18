<template>
  <n-row align="middle">
    <n-col :span="6">
      <n-date-picker v-model="value" type="datetime" prefix-icon="task_filled" />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value2" type="datetime" :suffix-icon="h(IconFlip, {color: 'green', size: 14})" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { IconFlip } from '@aurora/icon';

const value = ref();
const value2 = ref();
</script>
