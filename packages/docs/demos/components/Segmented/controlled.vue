<template>
  <h-space direction="vertical">
    <h-space>
      <div>激活</div>
      <h-select v-model="activeKey">
        <h-option v-for="v in week" :key="v" :label="v" :value="v" />
      </h-select>
    </h-space>
    <h-segmented v-model:active-key="activeKey">
      <h-segmented-item v-for="v in week" :key="v" :label="v" />
    </h-segmented>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeKey = ref('Monday');
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
</script>

<style scoped></style>
