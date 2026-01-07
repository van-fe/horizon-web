<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const value2 = ref(0);
const value3 = ref();

function onChange(val: number | string | null | undefined) {
  console.info('change: ', val);
}

function onUpdate(val: number | string | null | undefined) {
  console.info('update: ', val);
}

function onFocus(evt: FocusEvent) {
  console.info('focus: ', evt);
}

function onBlur(evt: FocusEvent) {
  console.info('blur: ', evt);
}
</script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">步长默认</div>
      <h-input-number v-model="value1" :min="5" :max="10" @change="onChange" @focus="onFocus" @blur="onBlur" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">步长为0.5</div>
      <h-input-number v-model="value2" :min="5" :max="10" :step="0.5" :precision="1" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">数值必须是步长的倍数，步长为3</div>
      <h-input-number v-model="value3" :min="0" :max="10" :step="3" :step-strictly="true" @update:modelValue="onUpdate" @change="onChange" />
    </h-col>
  </h-row>
</template>
