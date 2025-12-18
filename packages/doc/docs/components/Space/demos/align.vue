<script setup lang="ts">
import { ref } from 'vue';

const align = ref<'start' | 'end' | 'center' | 'baseline'>('center');
const direction = ref<'vertical' | 'horizontal'>('horizontal');
</script>

<template>
  <n-space block direction="vertical">
    <n-space>
      方向
      <n-radio v-model="direction" label="horizontal">vertical</n-radio>
      <n-radio v-model="direction" label="vertical">horizontal</n-radio>
    </n-space>
    <n-space>
      对齐
      <n-radio v-model="align" label="start">start</n-radio>
      <n-radio v-model="align" label="center">center</n-radio>
      <n-radio v-model="align" label="end">end</n-radio>
      <n-radio v-model="align" label="baseline">baseline</n-radio>
    </n-space>
    <n-space
      :direction="direction"
      :align="align"
      style="border: 1px solid var(--n-bg-brand-default)"
    >
      Space
      <n-button type="normal">Button</n-button>
      <div style="height: 100px; background: #f1f2f3; padding: 10px">block</div>
    </n-space>
  </n-space>
</template>

<style scoped></style>
