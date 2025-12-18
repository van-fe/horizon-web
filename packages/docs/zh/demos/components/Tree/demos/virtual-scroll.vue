<template>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree
        :tree-data="baseData"
        :use-virtual-scroll="true"
        :max-height="300"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree
        :tree-data="baseData"
        :use-virtual-scroll="true"
        :max-height="300"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import type { BaseTreeData } from '@aurora/horizon-web/es/utils/useTree';

const baseData = shallowRef<BaseTreeData[]>(new Array(100).fill(0).map((_, i) => ({
  label: `${i + 1}`,
  value: i + 1,
  children: new Array(50).fill(0).map((_, j) => ({
    label: `${i + 1}-${j + 1}`,
    value: (i + 1) * 100 + j + 1,
    children: new Array(10).fill(0).map((_, k) => ({
      label: `${i + 1}-${j + 1}-${k + 1}`,
      value: (i + 1) * 10000 + (j + 1) * 100 + k + 1,
    })),
  })),
})));
</script>
