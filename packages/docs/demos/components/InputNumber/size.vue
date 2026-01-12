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
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">large</div>
      <h-input-number v-model="value" size="large" @input="onInput" @change="onChange" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">medium (default)</div>
      <h-input-number v-model="value" @input="onInput" @change="onChange" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">small</div>
      <h-input-number v-model="value" size="small" @input="onInput" @change="onChange" />
    </h-col>
  </h-row>
</template>
