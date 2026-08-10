<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const disabled = ref(false);
const selectedValues = ref<Array<string | number>>(['retention']);
const treeData: HTreeNodeData[] = [
  {
    value: 'data-policy',
    label: 'Data policy',
    children: [
      { value: 'retention', label: 'Retention policy' },
      { value: 'legal-hold', label: 'Legal hold · managed', disabled: true },
    ],
  },
  {
    value: 'access-policy',
    label: 'Access policy',
    children: [
      { value: 'mfa', label: 'Multi-factor authentication' },
      { value: 'sso', label: 'Single sign-on · managed', disabled: true },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="disabled" label="Disable entire tree" />
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="treeData"
      :disabled="disabled"
      :parent-effect-disabled-child="false"
      multiple
      :is-default-expand-all="true"
    />
    <span aria-live="polite">Selected: {{ selectedValues.join(', ') || 'none' }}</span>
  </div>
</template>
