<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="position">
      <n-radio-group v-model="position">
        <n-radio label="right" />
        <n-radio label="bottom" />
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <n-auto-complete :options="options" :description-position="position" @search="onSearch" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NAutoCompleteOptionProps } from '@nio-fe/lego';

const options = ref<Partial<NAutoCompleteOptionProps>[]>([]);

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

<style scoped>
</style>
