<script setup lang="ts">
import { computed, ref } from 'vue';

const value = ref('northstar');
const workspaces = [
  { value: 'northstar', label: 'Northstar launch' },
  { value: 'atlas', label: 'Atlas redesign' },
  { value: 'horizon', label: 'Horizon migration' },
  { value: 'mobile', label: 'Mobile quality' },
];
const selectedLabel = computed(
  () => workspaces.find(workspace => workspace.value === value.value)?.label ?? '未选择',
);
</script>

<template>
  <div class="select-demo">
    <h-select v-model="value" filterable clearable :to-body="false" placeholder="选择工作区">
      <h-option v-for="workspace in workspaces" :key="workspace.value" v-bind="workspace" />
    </h-select>
    <p class="docs-demo__status" role="status">当前工作区：{{ selectedLabel }}</p>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 10px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}
</style>
