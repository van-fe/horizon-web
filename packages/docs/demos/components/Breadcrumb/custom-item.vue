<template>
  <section class="breadcrumb-item-demo">
    <h-breadcrumb title>
      <h-breadcrumb-item>Workspace</h-breadcrumb-item>
      <h-breadcrumb-item>
        <h-dropdown>
          <h-button text type="normal" size="small">
            Product design
            <template #suffix><IconArrowDown :size="12" /></template>
          </h-button>
          <h-dropdown-menu>
            <h-dropdown-item>Product design</h-dropdown-item>
            <h-dropdown-item>Design systems</h-dropdown-item>
            <h-dropdown-item>User research</h-dropdown-item>
          </h-dropdown-menu>
        </h-dropdown>
      </h-breadcrumb-item>
      <h-breadcrumb-item>Weekly review</h-breadcrumb-item>
    </h-breadcrumb>
  </section>
</template>

<script setup lang="ts">
import { IconArrowDown } from '@aurora/icon';
</script>

<style scoped>
.breadcrumb-item-demo :deep(.h-button__content) {
  display: inline-flex;
  align-items: center;
  gap: var(--h-spacing-1);
}
</style>
