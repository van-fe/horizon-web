<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-select v-model="value1" :value-format="valueFormat" :to-body="false">
        <h-option :value="1" label="中国" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
      <div class="mb-2">你选中的值是 {{ value1 }}</div>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-select v-model="value2" :value-format="valueFormat" multiple :to-body="false">
        <h-option :value="1" label="中国" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
      <div class="mb-2">你选中的值是 {{ value2 }}</div>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import type { OptionProps } from '@aurora/horizon-web/es/components/Select/src/composables/useProps';

const value1 = shallowRef({ "value": 1, "label": "中国" });
const value2 = shallowRef([{ "value": 1, "label": "中国" }]);

function valueFormat(originValue: OptionProps) {
  console.info(JSON.stringify(originValue));
  return {
    value: originValue.value,
    label: originValue.label,
  };
}
</script>

<style scoped>
</style>
