<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');

function onInput(value: number | string | null) {
  console.log('input: ', value);
}

function onChange(value: number | string | null | undefined) {
  console.log('change: ', value);
}

function onUpdate(value: number | string | null | undefined) {
  console.log('update: ', value);
}
</script>

<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">large</div>
      <n-input-number v-model="value" size="large" @input="onInput" @change="onChange" @update:model-value="onUpdate" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">medium (default)</div>
      <n-input-number v-model="value" @input="onInput" @change="onChange" @update:model-value="onUpdate" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">small</div>
      <n-input-number v-model="value" size="small" @input="onInput" @change="onChange" @update:model-value="onUpdate" />
    </n-col>
  </n-row>
</template>
