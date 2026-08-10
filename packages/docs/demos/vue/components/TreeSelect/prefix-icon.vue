<script setup lang="ts">
import { ref } from 'vue';
import { IconCar } from '@aurora/icon';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValue = ref<string | number>('vehicle-018');
const treeData: HTreeNodeData[] = [
  {
    value: 'north-hub',
    label: 'North hub',
    children: [
      { value: 'vehicle-018', label: 'Vehicle 018 · available' },
      { value: 'vehicle-024', label: 'Vehicle 024 · charging' },
    ],
  },
  {
    value: 'south-hub',
    label: 'South hub',
    children: [{ value: 'vehicle-041', label: 'Vehicle 041 · inspection due' }],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-tree-select
      v-model="selectedValue"
      :tree-data="treeData"
      :prefix-icon="IconCar"
      show-radio
      show-line
      placeholder="Choose a fleet vehicle"
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ selectedValue || 'none' }}</span>
  </div>
</template>
