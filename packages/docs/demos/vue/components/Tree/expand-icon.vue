<script setup lang="ts">
import { computed, h, ref } from 'vue';
import { IconAdd, IconArrowRight, IconReduce } from '@aurora/icon';
import type { HTreeNodeData } from '@aurora/horizon-web';

type IconMode = 'rotate' | 'explicit';

const iconMode = ref<IconMode>('rotate');
const expandValues = ref<Array<string | number>>(['quarter-one']);
const treeData: HTreeNodeData[] = [
  {
    value: 'quarter-one',
    label: 'Quarter one',
    children: [
      { value: 'research', label: 'Customer research' },
      { value: 'prototype', label: 'Prototype validation' },
    ],
  },
  {
    value: 'quarter-two',
    label: 'Quarter two',
    children: [{ value: 'beta', label: 'Private beta' }],
  },
];
const foldIcon = computed(() =>
  h(iconMode.value === 'rotate' ? IconArrowRight : IconAdd, { size: 12 }),
);
const expandIcon = computed(() =>
  iconMode.value === 'explicit' ? h(IconReduce, { size: 12 }) : undefined,
);
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="iconMode" size="small">
      <h-segmented-item value="rotate" label="Rotating arrow" />
      <h-segmented-item value="explicit" label="Plus / minus" />
    </h-segmented>
    <h-tree
      v-model:expand-values="expandValues"
      :tree-data="treeData"
      :fold-icon="foldIcon"
      :expand-icon="expandIcon"
    />
  </div>
</template>
