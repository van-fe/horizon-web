<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-cascader
        v-model="currentVal1"
        :clearable="true"
        :filterable="true"
        :options="baseData"
        :use-virtual-scroll="true"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-cascader
        v-model="currentVal2"
        :clearable="true"
        :filterable="true"
        :options="baseData"
        :multiple="true"
        :collapse-tags="true"
        :use-virtual-scroll="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { BaseTreeData } from '@nio-fe/lego/es/utils/useTree';

const currentVal1 = ref<string[]>();
const currentVal2 = ref<string[][]>();
const baseData: BaseTreeData[] = new Array(100).fill(0).map((_, i) => ({
  label: `${i + 1}`,
  value: i + 1,
  children: new Array(100).fill(0).map((_, j) => ({
    label: `${i + 1}-${j + 1}`,
    value: j + 1,
    children: new Array(5).fill(0).map((_, k) => ({
      label: `${i + 1}-${j + 1}-${k + 1}`,
      value: k + 1,
    })),
  })),
}));
</script>
