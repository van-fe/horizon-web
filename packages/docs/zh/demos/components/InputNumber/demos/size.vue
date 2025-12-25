<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);

function onInput(value: number) {
  console.info('input', value);
}

function onChange(value: number) {
  console.info('change', value);
}
</script>

<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">large</div>
      <n-input-number v-model="value" size="large" @input="onInput" @change="onChange" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">medium (default)</div>
      <n-input-number v-model="value" @input="onInput" @change="onChange" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">small</div>
      <n-input-number v-model="value" size="small" @input="onInput" @change="onChange" />
    </n-col>
  </n-row>
</template>
