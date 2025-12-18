<template>
  <n-row>
    <n-col :span="6">
      {{ Object.prototype.toString.call(value) }}
      <n-date-picker v-model="value" type="date" :initial-value="null" @update:modelValue="onUpdate" @change="onChange" @pick="onPick" />
    </n-col>
    <n-col :span="6">
      {{ Object.prototype.toString.call(value2) }}
      <n-date-picker v-model="value2" type="date-range" :initial-value="null" @update:modelValue="onUpdate" @change="onChange" @pick="onPick" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();

function onUpdate(val: unknown) {
  console.log('update: ', val);
}

function onChange(val: unknown) {
  console.log('change: ', val);
}

function onPick(val: unknown) {
  console.log('pick: ', val);
}
</script>
