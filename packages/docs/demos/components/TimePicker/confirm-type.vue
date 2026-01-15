<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker
        v-model="value"
        placeholder="Press Enter key to confirm"
        @update:modelValue="onUpdate"
        @change="onChange" />
    </h-col>
    <h-col :span="6">
      <h-time-picker
        v-model="value2"
        confirm-type="blur"
        placeholder="Input blur to confirm"
        @update:modelValue="onUpdate"
        @change="onChange" />
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
</script>
