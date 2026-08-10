<template>
  <section class="docs-demo sortable-list-compact-demo">
    <h-sortable-list v-model="stages" item-key="value" :drag-on-handler="false">
      <template #item="{ item, index }">
        <span class="sortable-list-compact-demo__index">{{ index + 1 }}</span>
        <span>{{ item.label }}</span>
      </template>
      <template #handle><span aria-hidden="true">⋮⋮</span></template>
    </h-sortable-list>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const stages = ref([
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'published', label: 'Published' },
]);
</script>

<style scoped>
.sortable-list-compact-demo {
  max-width: 420px;
}

.sortable-list-compact-demo :deep(.h-sortable-list) {
  gap: var(--h-spacing-2);
}

.sortable-list-compact-demo :deep(.h-sortable-list__item) {
  padding: var(--h-spacing-3) var(--h-spacing-4);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-secondary);
  cursor: grab;
}

.sortable-list-compact-demo__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: var(--h-spacing-3);
  border-radius: var(--h-radius-circle);
  background: var(--h-bg-weak-activated);
}
</style>
