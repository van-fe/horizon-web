<script setup lang="ts">
import { ref } from 'vue';

const align = ref('center');
const direction = ref('horizontal');
</script>

<template>
  <h-space block direction="vertical">
    <h-space>
      Direction
      <h-radio v-model="direction" label="horizontal">horizontal</h-radio>
      <h-radio v-model="direction" label="vertical">vertical</h-radio>
    </h-space>
    <h-space>
      Align
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
      <h-button>Button</h-button>
      <div style="height: 100px; background: #f1f2f3; padding: 10px">block</div>
    </h-space>
  </h-space>
</template>

<style scoped></style>
