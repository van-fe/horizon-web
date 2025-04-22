<template>
  <n-row>
    <n-col :span="24">
      {{ dynamicTreeData }}
    </n-col>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree v-model:tree-data="dynamicTreeData" :dynamic-load-data="dynLoad" />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree v-model:tree-data="dynamicTreeData" :dynamic-load-data="dynLoad" :multiple="true" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NTreeDynamicLoadNode, NTreeNodeData } from '@nio-fe/lego';

const dynamicTreeData = ref<NTreeNodeData[]>([
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        isLeaf: false,
        children: [],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        isLeaf: false,
        children: [],
      },
    ],
  },
]);

const dynLoad = (data: NTreeDynamicLoadNode) => {
  console.log(data, data.node);

  return new Promise<NTreeNodeData[]>((resolve, reject) => {
    if (!data.node) return reject();

    setTimeout(
      () =>
        resolve(
          data.node!.value === 'disciplines'
            ? [
              {
                value: 'consistency',
                label: 'Consistency',
              },
              {
                value: 'feedback',
                label: 'Feedback',
              },
              {
                value: 'efficiency',
                label: 'Efficiency',
              },
              {
                value: 'controllability',
                label: 'Controllability',
              },
            ]
            : [
              {
                value: 'side nav',
                label: 'Side Navigation',
              },
              {
                value: 'top nav',
                label: 'Top Navigation',
              },
            ],
        ),
      2000,
    );
  });
};
</script>

<style scoped>
.tree-box {
  max-height: 300px;
  overflow: auto;
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
  flex-shrink: 0;
  flex-basis: 340px;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.1), 0px 6px 16px rgba(0, 0, 0, 0.06),
    0px 9px 28px 8px rgba(0, 0, 0, 0.03);
}
</style>
