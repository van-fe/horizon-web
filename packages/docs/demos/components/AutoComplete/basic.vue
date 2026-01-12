<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="尺寸">
      <h-select v-model="sizeValue" :to-body="false">
        <h-option value="large" label="large" />
        <h-option value="medium" label="medium" />
        <h-option value="small" label="small" />
      </h-select>
    </h-form-item>
    <h-form-item label="样式">
      <h-select v-model="inputStyle" :to-body="false">
        <h-option value="normal" label="normal" />
        <h-option value="emphasize" label="emphasize" />
        <h-option value="no-border" label="no-border" />
      </h-select>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <h-auto-complete :options="options" :size="sizeValue" :input-style="inputStyle" @search="onSearch" @select="onSelect" @update:model-value="onUpdate" />
    </h-col>
  </h-row>
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
  console.info('select: ', val);
}

function onUpdate(val: string) {
  console.info('update: ', val);
}
</script>

<style scoped>
</style>
