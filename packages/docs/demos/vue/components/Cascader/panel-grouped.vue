<script setup lang="ts">
import type { HCascaderOption } from '@aurora/horizon-web';
import { ref } from 'vue';
import { formatPath } from './options';

const value = ref<Array<string | number>>(['delivery', 'release', 'web']);
const options: HCascaderOption[] = [
  { groupLabel: 'Delivery runbooks' },
  {
    value: 'delivery',
    label: 'Delivery',
    children: [
      {
        value: 'release',
        label: 'Release',
        children: [
          { value: 'web', label: 'Web release' },
          { value: 'mobile', label: 'Mobile release' },
        ],
      },
    ],
  },
  { groupLabel: 'Operations runbooks' },
  {
    value: 'operations',
    label: 'Operations',
    children: [
      {
        value: 'incident',
        label: 'Incident response',
        children: [{ value: 'service', label: 'Service degradation' }],
      },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      aria-label="Runbook destination"
      :options="options"
      :to-body="false"
    />
    <span aria-live="polite">{{ formatPath(value) }}</span>
  </div>
</template>
