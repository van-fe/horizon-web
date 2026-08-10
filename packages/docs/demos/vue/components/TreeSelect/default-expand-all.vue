<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const expandAll = ref(true);
const instanceKey = ref(0);
const selectedValue = ref<string | number>('audit-log');
const treeData: HTreeNodeData[] = [
  {
    value: 'identity',
    label: 'Identity',
    children: [
      { value: 'sso', label: 'Single sign-on' },
      { value: 'directory-sync', label: 'Directory sync' },
    ],
  },
  {
    value: 'governance',
    label: 'Governance',
    children: [
      { value: 'audit-log', label: 'Audit log' },
      { value: 'retention', label: 'Data retention' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="expandAll" label="Expand all initially" />
      <h-button size="small" @click="instanceKey += 1">Recreate picker</h-button>
    </div>
    <h-tree-select
      :key="instanceKey"
      v-model="selectedValue"
      :tree-data="treeData"
      :is-default-expand-all="expandAll"
      placeholder="Choose a service"
      :to-body="false"
    />
  </div>
</template>
