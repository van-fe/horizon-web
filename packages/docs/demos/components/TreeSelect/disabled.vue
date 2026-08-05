<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const disabled = ref(false);
const selectedValues = ref<Array<string | number>>(['mfa', 'encryption']);
const treeData: HTreeNodeData[] = [
  {
    value: 'identity',
    label: 'Identity controls',
    children: [
      { value: 'mfa', label: 'Multi-factor authentication · managed', disabled: true },
      { value: 'session', label: 'Session timeout' },
    ],
  },
  {
    value: 'data',
    label: 'Data controls',
    children: [
      { value: 'encryption', label: 'Encryption at rest · managed', disabled: true },
      { value: 'exports', label: 'Restricted exports' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="disabled" label="Disable entire picker" />
    <h-tree-select
      v-model="selectedValues"
      :tree-data="treeData"
      :disabled="disabled"
      multiple
      :parent-effect-disabled-child="false"
      placeholder="Choose compliance controls"
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ selectedValues.join(', ') }}</span>
  </div>
</template>
