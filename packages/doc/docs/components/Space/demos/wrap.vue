<script setup lang="ts">
import { reactive } from 'vue';

const size = reactive<[number, number]>([10, 8]);
</script>

<template>
  <n-space block direction="vertical">
    <n-space block size="small" direction="vertical">
      <n-space block direction="vertical">
        Horizontal
        <n-slider v-model="size[0]" size="small" :step="1" :min="0" :max="100" />
      </n-space>
      <n-space block direction="vertical">
        Vertical
        <n-slider v-model="size[1]" size="small" :step="1" :min="0" :max="100" />
      </n-space>
    </n-space>
    <n-space wrap :size="size">
      <n-button v-for="i in 20" :key="i" type="normal">Button</n-button>
    </n-space>
  </n-space>
</template>

