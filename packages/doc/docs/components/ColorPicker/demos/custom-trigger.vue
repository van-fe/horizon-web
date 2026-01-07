<template>
  <h-color-picker v-model="modelValue">
    <template #trigger="color">
      <h-button icon="edit" :link="true" :style="{ color: color.resultsValue.value }" />
    </template>
  </h-color-picker>

  <h-color-picker v-model="modelValue2">
    <template #trigger="color">
      <h-button :plain="true">Pick Color {{ color.resultsValue.value ? `: ${color.resultsValue.value}` : '' }}</h-button>
    </template>
  </h-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelValue = ref();
const modelValue2 = ref();
</script>

<style>
.h-color-picker--square + .h-color-picker--square {
  margih-left: 16px;
}
</style>
