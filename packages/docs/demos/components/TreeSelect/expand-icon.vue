<script setup lang="ts">
import { computed, h, ref } from 'vue';
import { IconAdd, IconArrowRight, IconRemove } from '@aurora/icon';
import type { HTreeNodeData } from '@aurora/horizon-web';

type IconMode = 'rotate' | 'explicit';

const iconMode = ref<IconMode>('rotate');
const selectedValue = ref<string | number>('weekly');
const treeData: HTreeNodeData[] = [
  {
    value: 'recurring',
    label: 'Recurring reports',
    children: [
      { value: 'weekly', label: 'Weekly health summary' },
      { value: 'quarterly', label: 'Quarterly business review' },
    ],
  },
  {
    value: 'event-based',
    label: 'Event-based reports',
    children: [{ value: 'incident', label: 'Incident analysis' }],
  },
];
const foldIcon = computed(() =>
  h(iconMode.value === 'rotate' ? IconArrowRight : IconAdd, { size: 12 }),
);
const expandIcon = computed(() =>
  iconMode.value === 'explicit' ? h(IconRemove, { size: 12 }) : undefined,
);
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="iconMode" size="small">
      <h-segmented-item value="rotate" label="Rotating arrow" />
      <h-segmented-item value="explicit" label="Plus / minus" />
    </h-segmented>
    <h-tree-select
      v-model="selectedValue"
      :tree-data="treeData"
      :fold-icon="foldIcon"
      :expand-icon="expandIcon"
      placeholder="Choose a report"
      :to-body="false"
    />
  </div>
</template>
