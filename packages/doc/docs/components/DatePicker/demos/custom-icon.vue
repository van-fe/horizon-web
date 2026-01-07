<template>
  <h-row align="middle">
    <h-col :span="6">
      <h-date-picker v-model="value" type="datetime" prefix-icon="task_filled" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="datetime" :suffix-icon="h(IconFlip, {color: 'green', size: 14})" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { IconFlip } from '@aurora/icon';

const value = ref();
const value2 = ref();
</script>
