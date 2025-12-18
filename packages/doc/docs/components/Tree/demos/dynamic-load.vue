<template>
  <n-row>
    <n-col :span="24">
      {{ dynamicTreeData }}
    </n-col>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree v-model:tree-data="dynamicTreeData" :dynamic-load-data="dynLoad" show-line />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree v-model:tree-data="dynamicTreeData" :dynamic-load-data="dynLoad" :multiple="true" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { NTreeDynamicLoadNode, NTreeNodeData } from '@aurora/horizon-web';

const dynamicTreeData = ref<NTreeNodeData[]>();

onMounted(() => {
  dynamicTreeData.value = [
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
  ];
});

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
