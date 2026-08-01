<template>
  <h-empty :size="emptySizeRef" description="No task for now, take a coffee break" />
  <h-radio-group v-model="sizeRef">
    <h-radio value="small" />
    <h-radio value="medium" />
    <h-radio value="large" />
    <h-radio value="number">
      <h-input-number v-model="sizeNumberRef" :step="10" />
    </h-radio>
  </h-radio-group>
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
