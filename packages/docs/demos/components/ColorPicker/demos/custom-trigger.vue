<template>
  <n-color-picker v-model="modelValue">
    <template #trigger="color">
      <n-button icon="edit" :link="true" :style="{ color: color.resultsValue.value }" />
    </template>
  </n-color-picker>

  <n-color-picker v-model="modelValue2">
    <template #trigger="color">
      <n-button :plain="true">Pick Color {{ color.resultsValue.value ? `: ${color.resultsValue.value}` : '' }}</n-button>
    </template>
  </n-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelValue = ref();
const modelValue2 = ref();
</script>

<style>
.n-color-picker--square + .n-color-picker--square {
  margin-left: 16px;
}
</style>
