<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeDynamicLoadNode, HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>([]);
const status = ref('Expand an office to load its rooms');
const treeData = ref<HTreeNodeData[]>([
  {
    value: 'offices',
    label: 'Regional offices',
    children: [
      { value: 'berlin', label: 'Berlin office', isLeaf: false, children: [] },
      { value: 'singapore', label: 'Singapore office', isLeaf: false, children: [] },
    ],
  },
]);

function dynamicLoad(data: HTreeDynamicLoadNode) {
  const office = data.node?.value;
  if (!office) return Promise.resolve([]);
  const children: HTreeNodeData[] =
    office === 'berlin'
      ? [
          { value: 'berlin-atrium', label: 'Atrium · 18 seats' },
          { value: 'berlin-library', label: 'Library · 8 seats' },
        ]
      : [
          { value: 'singapore-bay', label: 'Bay room · 12 seats' },
          { value: 'singapore-garden', label: 'Garden room · 6 seats' },
        ];
  status.value = `${String(data.node?.label)} loaded`;
  return Promise.resolve(children);
}
</script>

<template>
  <div class="docs-demo">
    <h-tree
      v-model:tree-data="treeData"
      v-model:selected-values="selectedValues"
      :dynamic-load="dynamicLoad"
      :expand-values="['offices']"
      multiple
    />
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>
