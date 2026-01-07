<template>
  <h-space direction="vertical">
    <h-segmented default-active-key="Q1">
      <h-segmented-item v-for="(v, i) in quarter" :key="v" :disabled="i % 2 === 0" :label="v" />
    </h-segmented>
    <h-space>
      <h-segmented default-active-key="Sun">
        <h-segmented-item v-for="v in week" :key="v" :disabled="disabled" :label="v" />
      </h-segmented>
      <h-checkbox v-model="disabled">全部禁用</h-checkbox>
    </h-space>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(true);
const quarter = ['Q1', 'Q2', 'Q3', 'Q4'];
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
</script>

<style scoped></style>
