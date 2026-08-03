<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData, HTreeNodeDataWithLevel } from '@aurora/horizon-web';

const status = ref('Drag a workstream by its handle to reprioritize the roadmap.');
const roadmapTree = ref<HTreeNodeData[]>([
  {
    value: 'now',
    label: 'Now',
    children: [
      { value: 'onboarding', label: 'Onboarding refresh' },
      { value: 'billing', label: 'Billing reliability' },
    ],
  },
  {
    value: 'next',
    label: 'Next',
    children: [
      { value: 'analytics', label: 'Analytics workspace' },
      { value: 'production', label: 'Production migration', draggable: false },
    ],
  },
  {
    value: 'later',
    label: 'Later',
    children: [{ value: 'marketplace', label: 'Integration marketplace' }],
  },
]);

function beforeDrop(current: HTreeNodeDataWithLevel, target: HTreeNodeDataWithLevel | null) {
  if (target?.value === 'production') {
    status.value = 'Move blocked: Production migration is protected.';
    return false;
  }

  status.value = `${String(current.label)} moved near ${String(target?.label ?? 'roadmap root')}.`;
  return true;
}
</script>

<template>
  <div class="tree-drag-demo" aria-label="Roadmap drag ordering">
    <p role="status">{{ status }}</p>

    <h-tree
      v-model:tree-data="roadmapTree"
      draggable
      drag-on-handler
      :before-drop="beforeDrop"
      draggable-icon-always-visible
      :is-default-expand-all="true"
    />
  </div>
</template>

<style scoped>
.tree-drag-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.tree-drag-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
