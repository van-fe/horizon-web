<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const value2 = ref(0);
const value3 = ref();

function onChange(val: number) {
  console.info('change: ', val);
}

function onUpdate(val: number) {
  console.info('update: ', val);
}
</script>

<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">步长默认</div>
      <h-input-number v-model="value1" :min="5" :max="10" @change="onChange" />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">步长为0.5</div>
      <h-input-number v-model="value2" :min="5" :max="10" :step="0.5" :precision="1" />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">数值必须是步长的倍数，步长为3</div>
      <h-input-number v-model="value3" :min="0" :max="10" :step="3" :step-strictly="true" @update:modelValue="onUpdate" @change="onChange" />
    </h-grid-item>
  </h-grid>
</template>
