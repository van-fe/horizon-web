<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="position">
      <h-radio-group v-model="position">
        <h-radio value="right" />
        <h-radio value="bottom" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-auto-complete :options="options" :description-position="position" @search="onSearch" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HAutoCompleteOptionProps } from '@aurora/horizon-web';

const options = ref<Partial<HAutoCompleteOptionProps>[]>([]);

const position = ref('right');

function onSearch(val: string) {
  options.value = [];

  if (val) {
    new Array(10).fill(0).forEach((_, index) => {
      const value = val.repeat(index + 1);
      options.value.push({
        label: value,
        description: `第 ${index + 1} 个选项`,
        value,
      });
    });
  }
}
</script>

<style scoped></style>
