<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const stressed = ref(true);
const selectedValues = ref<Array<string | number>>(['checkout-latency']);
const incidentTree: HTreeNodeData[] = [
  {
    value: 'active',
    label: 'Active incidents',
    children: [
      { value: 'checkout-latency', label: 'Checkout latency · SEV 2' },
      { value: 'email-delay', label: 'Email delivery delay · SEV 3' },
    ],
  },
  {
    value: 'resolved',
    label: 'Resolved this week',
    children: [{ value: 'search-timeout', label: 'Search timeout · resolved' }],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="stressed" label="Emphasize selection" />
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="incidentTree"
      :stress="stressed"
      show-radio
      :is-default-expand-all="true"
    />
    <span aria-live="polite">Selected: {{ selectedValues[0] || 'none' }}</span>
  </div>
</template>
