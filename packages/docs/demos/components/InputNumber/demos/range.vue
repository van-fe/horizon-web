<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const value2 = ref(0);
const value3 = ref();

function onChange(val: number) {
  console.log('change: ', val);
}

function onUpdate(val: number) {
  console.log('update: ', val);
}
</script>

<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">步长默认</div>
      <n-input-number v-model="value1" :min="5" :max="10" @change="onChange" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">步长为0.5</div>
      <n-input-number v-model="value2" :min="5" :max="10" :step="0.5" :precision="1" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">数值必须是步长的倍数，步长为3</div>
      <n-input-number v-model="value3" :min="0" :max="10" :step="3" :step-strictly="true" @update:modelValue="onUpdate" @change="onChange" />
    </n-col>
  </n-row>
</template>
