<template>
  <h-space direction="vertical" :size="16">
    <h-license-plate-input v-model="plate" />
    <span>当前值：{{ plate || '未输入' }}</span>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const plate = ref('京A12345');
</script>
