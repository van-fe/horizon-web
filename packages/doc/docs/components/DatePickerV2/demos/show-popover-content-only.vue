<template>
  <n-row>
    <n-col :span="24">
      <n-date-picker-v2
        v-model="value"
        type="date"
        :show-popover-content-only="true"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </n-col>
    <n-col :span="24">
      <n-date-picker-v2
        v-model="value2"
        type="date-range"
        :show-popover-content-only="true"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const value2 = ref('');

function onUpdate(val: unknown) {
  console.log('update: ', val);
}

function onChange(val: unknown) {
  console.log('change: ', val);
}

function onPick(val: unknown) {
  console.log('pick: ', val);
}

onMounted(() => {
  setTimeout(() => {
    value.value = new Date();
  }, 1000);
});
</script>
