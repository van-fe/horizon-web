<script setup lang="ts">
import { ref } from 'vue';

const align = ref<'start' | 'end' | 'center' | 'baseline'>('center');
const direction = ref<'vertical' | 'horizontal'>('horizontal');
</script>

<template>
  <h-space block direction="vertical">
    <h-space>
      方向
      <h-radio v-model="direction" label="horizontal">vertical</h-radio>
      <h-radio v-model="direction" label="vertical">horizontal</h-radio>
    </h-space>
    <h-space>
      对齐
      <h-radio v-model="align" label="start">start</h-radio>
      <h-radio v-model="align" label="center">center</h-radio>
      <h-radio v-model="align" label="end">end</h-radio>
      <h-radio v-model="align" label="baseline">baseline</h-radio>
    </h-space>
    <h-space
      :direction="direction"
      :align="align"
      style="border: 1px solid var(--h-bg-brand-default)"
    >
      Space
      <h-button type="normal">Button</h-button>
      <div style="height: 100px; background: #f1f2f3; padding: 10px">block</div>
    </h-space>
  </h-space>
</template>

<style scoped></style>
