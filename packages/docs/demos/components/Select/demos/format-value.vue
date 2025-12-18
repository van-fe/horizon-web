<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-select v-model="value1" :value-format="valueFormat" :to-body="false">
        <n-option :value="1" label="中国" />
        <n-option :value="2" label="美国" />
        <n-option :value="3" label="日本" />
      </n-select>
      <div class="mb-2">你选中的值是 {{ value1 }}</div>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-select v-model="value2" :value-format="valueFormat" multiple :to-body="false">
        <n-option :value="1" label="中国" />
        <n-option :value="2" label="美国" />
        <n-option :value="3" label="日本" />
      </n-select>
      <div class="mb-2">你选中的值是 {{ value2 }}</div>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import type { OptionProps } from '@aurora/horizon-web/es/components/Select/src/composables/useProps';

const value1 = shallowRef({ "value": 1, "label": "中国" });
const value2 = shallowRef([{ "value": 1, "label": "中国" }]);

function valueFormat(originValue: OptionProps) {
  console.log(JSON.stringify(originValue));
  return {
    value: originValue.value,
    label: originValue.label,
  };
}
</script>

<style scoped>
</style>
