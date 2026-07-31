<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-date-picker
        v-model="value"
        type="date"
        :show-popover-content-only="true"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </h-grid-item>
    <h-grid-item :span="24">
      <h-date-picker
        v-model="value2"
        type="date-range"
        :show-popover-content-only="true"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const value2 = ref('');

function onUpdate(val: unknown) {
  console.info('update: ', val);
}

function onChange(val: unknown) {
  console.info('change: ', val);
}

function onPick(val: unknown) {
  console.info('pick: ', val);
}

onMounted(() => {
  setTimeout(() => {
    value.value = new Date();
  }, 1000);
});
</script>
