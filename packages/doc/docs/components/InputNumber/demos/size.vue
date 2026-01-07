<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');

function onInput(value: number | string | null) {
  console.info('input: ', value);
}

function onChange(value: number | string | null | undefined) {
  console.info('change: ', value);
}

function onUpdate(value: number | string | null | undefined) {
  console.info('update: ', value);
}
</script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">large</div>
      <h-input-number v-model="value" size="large" @input="onInput" @change="onChange" @update:model-value="onUpdate" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">medium (default)</div>
      <h-input-number v-model="value" @input="onInput" @change="onChange" @update:model-value="onUpdate" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">small</div>
      <h-input-number v-model="value" size="small" @input="onInput" @change="onChange" @update:model-value="onUpdate" />
    </h-col>
  </h-row>
</template>
