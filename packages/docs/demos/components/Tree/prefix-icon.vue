<script setup lang="ts">
import { ref } from 'vue';
import { IconCar } from '@aurora/icon';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>(['vehicle-018']);
const fleetTree: HTreeNodeData[] = [
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
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="fleetTree"
      :prefix-icon="IconCar"
      show-radio
      show-line
      :is-default-expand-all="true"
    />
    <span aria-live="polite">Selected: {{ selectedValues[0] || 'none' }}</span>
  </div>
</template>
