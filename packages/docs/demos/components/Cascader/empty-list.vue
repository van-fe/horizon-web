<script setup lang="ts">
import type { HCascaderOption } from '@aurora/horizon-web';
import { ref } from 'vue';

const value = ref<string[]>([]);
const options: HCascaderOption[] = [
  { value: 'archived', label: 'Archived workspaces', isLeaf: false },
  {
    value: 'active',
    label: 'Active workspaces',
    children: [{ value: 'horizon', label: 'Horizon release' }],
  },
];
</script>

<template>
  <h-cascader
    v-model="value"
    aria-label="Workspace"
    :options="options"
    empty-text="No archived workspaces"
    :to-body="false"
  >
    <template #empty>
      <h-empty description="No archived workspaces to restore" />
    </template>
  </h-cascader>
</template>
