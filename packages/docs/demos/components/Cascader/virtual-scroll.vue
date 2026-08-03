<script setup lang="ts">
import type { HCascaderOption } from '@aurora/horizon-web';
import { ref } from 'vue';

const value = ref<Array<Array<string | number>>>([
  [1, 1, 1],
  [2, 8, 2],
]);
const options: HCascaderOption[] = Array.from({ length: 40 }, (_, regionIndex) => ({
  label: `Region ${regionIndex + 1}`,
  value: regionIndex + 1,
  children: Array.from({ length: 40 }, (_, serviceIndex) => ({
    label: `Service ${serviceIndex + 1}`,
    value: serviceIndex + 1,
    children: Array.from({ length: 4 }, (_, environmentIndex) => ({
      label: ['Production', 'Staging', 'Preview', 'Development'][environmentIndex],
      value: environmentIndex + 1,
    })),
  })),
}));
</script>

<template>
  <h-cascader
    v-model="value"
    aria-label="Deployment destinations"
    :options="options"
    filterable
    multiple
    collapse-tags
    use-virtual-scroll
    :to-body="false"
  />
</template>
