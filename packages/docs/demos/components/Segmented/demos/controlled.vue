<template>
  <n-space direction="vertical">
    <n-space>
      <div>激活</div>
      <n-select v-model="activeKey">
        <n-option v-for="v in week" :key="v" :label="v" :value="v" />
      </n-select>
    </n-space>
    <n-segmented v-model:active-key="activeKey">
      <n-segmented-item v-for="v in week" :key="v" :label="v" />
    </n-segmented>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeKey = ref('Monday');
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
</script>

<style scoped></style>
