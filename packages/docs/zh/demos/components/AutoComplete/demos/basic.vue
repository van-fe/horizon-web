<template>
  <n-form :inline="true" label-position="top">
    <n-form-item label="尺寸">
      <n-select v-model="sizeValue" :to-body="false">
        <n-option value="large" label="large" />
        <n-option value="medium" label="medium" />
        <n-option value="small" label="small" />
      </n-select>
    </n-form-item>
    <n-form-item label="样式">
      <n-select v-model="inputStyle" :to-body="false">
        <n-option value="normal" label="normal" />
        <n-option value="emphasize" label="emphasize" />
        <n-option value="no-border" label="no-border" />
      </n-select>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <n-auto-complete :options="options" :size="sizeValue" :input-style="inputStyle" @search="onSearch" @select="onSelect" @update:model-value="onUpdate" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import type { NAutoCompleteOptionProps } from '@aurora/horizon-web';
import { useAutoCompleteProps } from '@aurora/horizon-web';

const sizeValue = ref<Required<ExtractPropTypes<typeof useAutoCompleteProps>['size']>>('medium');
const inputStyle = ref<Required<ExtractPropTypes<typeof useAutoCompleteProps>['inputStyle']>>('normal');

const options = ref<Partial<NAutoCompleteOptionProps>[]>([]);

function onSearch(val: string) {
  options.value = [];

  if (val) {
    new Array(10).fill(0).forEach((_, index) => {
      const value = val.repeat(index + 1);
      options.value.push({
        label: value,
        value,
      });
    });
  }
}

function onSelect(val: string) {
  console.log('select: ', val);
}

function onUpdate(val: string) {
  console.log('update: ', val);
}
</script>

<style scoped>
</style>
