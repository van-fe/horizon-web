<template>
  <h-row>
    <h-col :span="6">
      {{ Object.prototype.toString.call(value) }}
      <h-time-picker v-model="value" :initial-value="null" @update:modelValue="onUpdate" @change="onChange" @pick="onPick" />
    </h-col>
    <h-col :span="6">
      {{ Object.prototype.toString.call(value2) }}
      <h-time-picker v-model="value2" :is-range="true" :initial-value="null" @update:modelValue="onUpdate" @change="onChange" @pick="onPick" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();

function onUpdate(val: unknown) {
  console.info('update: ', val);
}

function onChange(val: unknown) {
  console.info('change: ', val);
}

function onPick(val: unknown) {
  console.info('pick: ', val);
}
</script>
