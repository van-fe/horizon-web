<script setup lang="ts">
import { reactive } from 'vue';

const size = reactive([10, 8]);
</script>

<template>
  <n-space block direction="vertical">
    <n-space block size="small" direction="vertical">
      <n-space block direction="vertical">
        Horizontal
        <n-slider v-model="size[0]" :step="1" :min="0" :max="100" />
      </n-space>
      <n-space block direction="vertical">
        Vertical
        <n-slider v-model="size[1]" :step="1" :min="0" :max="100" />
      </n-space>
    </n-space>
    <n-space wrap :size="size">
      <n-button v-for="i in 20" :key="i">Button</n-button>
    </n-space>
  </n-space>
</template>

<style scoped></style>
