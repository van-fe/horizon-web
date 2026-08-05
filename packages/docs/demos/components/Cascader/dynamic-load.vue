<script setup lang="ts">
import type { HCascaderDynamicLoadNode, HCascaderOption } from '@aurora/horizon-web';
import { onBeforeUnmount, ref } from 'vue';

const options = ref<HCascaderOption[]>([
  { value: 'asia-pacific', label: 'Asia Pacific', isLeaf: false },
  { value: 'europe', label: 'Europe', isLeaf: false },
  { value: 'north-america', label: 'North America', isLeaf: false },
]);
const value = ref<string[]>([]);
const status = ref('No region loaded yet');
const pending = new Map<ReturnType<typeof setTimeout>, (value: HCascaderOption[]) => void>();

function dynamicLoad(node: HCascaderDynamicLoadNode): Promise<HCascaderOption[]> {
  const parent = String(node.options.at(-1)?.label ?? 'region');
  status.value = `Loading clusters for ${parent}…`;
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      pending.delete(timer);
      const slug = String(node.options.at(-1)?.value ?? 'region');
      const children = ['Primary', 'Secondary'].map((label, index) => ({
        value: `${slug}-${index + 1}`,
        label: `${parent} · ${label}`,
        isLeaf: true,
      }));
      status.value = `Loaded ${children.length} clusters for ${parent}`;
      resolve(children);
    }, 400);
    pending.set(timer, resolve);
  });
}

onBeforeUnmount(() => {
  pending.forEach((resolve, timer) => {
    clearTimeout(timer);
    resolve([]);
  });
  pending.clear();
});
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      v-model:options="options"
      aria-label="Primary cluster"
      placeholder="Choose a cluster"
      :dynamic-load="dynamicLoad"
      :to-body="false"
    />
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>
