<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker
        v-model="value"
        type="date"
        placeholder="Press Enter key to confirm"
        @update:modelValue="onUpdate"
        @change="onChange" />
    </n-col>
    <n-col :span="6">
      <n-date-picker
        v-model="value2"
        type="date"
        confirm-type="blur"
        placeholder="Input blur to confirm"
        @update:modelValue="onUpdate"
        @change="onChange" />
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
</script>
