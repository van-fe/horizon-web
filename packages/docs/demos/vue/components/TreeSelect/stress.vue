<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const stressed = ref(true);
const selectedValue = ref<string | number>('payments-critical');
const treeData: HTreeNodeData[] = [
  {
    value: 'payments',
    label: 'Payments',
    children: [
      { value: 'payments-critical', label: 'P1 · Checkout unavailable' },
      { value: 'payments-latency', label: 'P2 · Elevated authorization latency' },
    ],
  },
  {
    value: 'identity',
    label: 'Identity',
    children: [{ value: 'identity-login', label: 'P1 · Sign-in failures' }],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="stressed" label="Emphasize selection" />
    <h-tree-select
      v-model="selectedValue"
      :tree-data="treeData"
      :stress="stressed"
      input-style="emphasize"
      placeholder="Choose the active incident"
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ selectedValue || 'none' }}</span>
  </div>
</template>
