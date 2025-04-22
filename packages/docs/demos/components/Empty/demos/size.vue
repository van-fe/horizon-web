<template>
  <n-empty :size="emptySizeRef" description="No task for now, take a coffee break" />
  <n-radio-group v-model="sizeRef">
    <n-radio label="small" />
    <n-radio label="medium" />
    <n-radio label="large" />
    <n-radio label="number">
      <n-input-number v-model="sizeNumberRef" :step="10" />
    </n-radio>
  </n-radio-group>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const sizeRef = ref('medium');
const sizeNumberRef = ref(240);

const emptySizeRef = computed(() => {
  if (sizeRef.value === 'number') {
    return sizeNumberRef.value;
  }
  return sizeRef.value;
});
</script>
