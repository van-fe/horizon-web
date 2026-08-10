<template>
  <section class="docs-demo breadcrumb-divider-demo">
    <div>
      <span>Text</span>
      <h-breadcrumb :texts="path" separator="·" />
    </div>
    <div>
      <span>Icon</span>
      <h-breadcrumb :texts="path">
        <template #separator><IconArrowRight :size="12" /></template>
      </h-breadcrumb>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@aurora/icon';

const path = [{ text: 'Library' }, { text: 'Patterns' }, { text: 'Navigation' }];
</script>

<style scoped>
.breadcrumb-divider-demo > div {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-4);
}

.breadcrumb-divider-demo span {
  width: 40px;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
