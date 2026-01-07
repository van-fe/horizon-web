<template>
  <h-switch v-model="visible" />
  <h-slider v-model="width" :max="500" :min="100" />

  <div v-if="visible">
    <h-modal-select v-model="modelValue" :style="{width: width + 'px'}" multiple collapse-tags collapse-tags-tooltip filterable clearable>
      <h-option :value="1" label="蔚来超充站 上海斯尔丽产业园"></h-option>
      <h-option :value="2" label="蔚来换电站 上海斯尔丽产业园"></h-option>
    </h-modal-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const width = ref(250);
const modelValue = ref([1]);
</script>
