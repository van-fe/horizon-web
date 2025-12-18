<script setup lang="ts">
import { ref } from 'vue';

const align = ref('center');
const direction = ref('horizontal');
</script>

<template>
  <n-space block direction="vertical">
    <n-space>
      Direction
      <n-radio v-model="direction" label="horizontal">horizontal</n-radio>
      <n-radio v-model="direction" label="vertical">vertical</n-radio>
    </n-space>
    <n-space>
      Align
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
      <n-button>Button</n-button>
      <div style="height: 100px; background: #f1f2f3; padding: 10px">block</div>
    </n-space>
  </n-space>
</template>

<style scoped></style>
