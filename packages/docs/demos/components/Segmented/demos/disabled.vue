<template>
  <n-space direction="vertical">
    <n-segmented default-active-key="Q1">
      <n-segmented-item v-for="(v, i) in quarter" :key="v" :disabled="i % 2 === 0" :label="v" />
    </n-segmented>
    <n-space>
      <n-segmented default-active-key="Sun">
        <n-segmented-item v-for="v in week" :key="v" :disabled="disabled" :label="v" />
      </n-segmented>
      <n-checkbox v-model="disabled">全部禁用</n-checkbox>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(true);
const quarter = ['Q1', 'Q2', 'Q3', 'Q4'];
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
</script>

<style scoped></style>
