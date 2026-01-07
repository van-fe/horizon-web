<script setup lang="ts">
import { reactive } from 'vue';

const size = reactive<[number, number]>([10, 8]);
</script>

<template>
  <h-space block direction="vertical">
    <h-space block size="small" direction="vertical">
      <h-space block direction="vertical">
        Horizontal
        <h-slider v-model="size[0]" size="small" :step="1" :min="0" :max="100" />
      </h-space>
      <h-space block direction="vertical">
        Vertical
        <h-slider v-model="size[1]" size="small" :step="1" :min="0" :max="100" />
      </h-space>
    </h-space>
    <h-space wrap :size="size">
      <h-button v-for="i in 20" :key="i" type="normal">Button</h-button>
    </h-space>
  </h-space>
</template>

