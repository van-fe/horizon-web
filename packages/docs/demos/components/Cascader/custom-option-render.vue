<script setup lang="ts">
import { IconStarFilled } from '@aurora/icon';
import type { HCascaderOption } from '@aurora/horizon-web';
import { h, ref } from 'vue';

const value = ref<string[]>(['customer-impact', 'high']);
const options: HCascaderOption[] = [
  {
    value: 'customer-impact',
    label: 'Customer impact',
    children: [
      {
        value: 'critical',
        label: option => h('span', `Critical · ${option.value}`),
        stringLabel: 'Critical',
      },
      { value: 'high', label: 'High' },
      { value: 'standard', label: 'Standard' },
    ],
  },
  {
    value: 'internal',
    label: 'Internal operations',
    children: [{ value: 'blocked', label: 'Team blocked' }],
  },
];
</script>

<template>
  <h-cascader
    v-model="value"
    aria-label="Incident routing priority"
    placeholder="Choose a routing path"
    :options="options"
    filterable
    :to-body="false"
  >
    <template #itemRender="option">
      <span class="custom-option">
        <IconStarFilled :size="14" />
        {{ option.label }}
      </span>
    </template>
  </h-cascader>
</template>

<style scoped>
.custom-option {
  display: inline-flex;
  align-items: center;
  gap: var(--h-spacing-2);
}
</style>
