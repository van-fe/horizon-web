<template>
  <n-switch v-model="visible" />
  <n-slider v-model="width" :max="500" :min="100" />

  <div v-if="visible">
    <n-modal-select v-model="modelValue" :style="{width: width + 'px'}" multiple collapse-tags collapse-tags-tooltip filterable clearable>
      <n-option :value="1" label="蔚来超充站 上海斯尔丽产业园"></n-option>
      <n-option :value="2" label="蔚来换电站 上海斯尔丽产业园"></n-option>
    </n-modal-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const width = ref(250);
const modelValue = ref([1]);
</script>
