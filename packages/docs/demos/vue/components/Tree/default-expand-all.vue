<script setup lang="ts">
import type { HTreeNodeData } from '@aurora/horizon-web';

const treeData: HTreeNodeData[] = [
  {
    value: 'day-one',
    label: 'Day one',
    children: [
      { value: 'account', label: 'Activate your account' },
      { value: 'security-key', label: 'Register a security key' },
    ],
  },
  {
    value: 'first-week',
    label: 'First week',
    children: [
      {
        value: 'product-tour',
        label: 'Product tour',
        children: [
          { value: 'workspace', label: 'Create a workspace' },
          { value: 'invite', label: 'Invite a collaborator' },
        ],
      },
    ],
  },
];
</script>

<template>
  <h-tree :tree-data="treeData" :is-default-expand-all="true" :max-height="300" show-line />
</template>
