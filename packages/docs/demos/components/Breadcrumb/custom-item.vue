<template>
  <h-breadcrumb>
    <h-breadcrumb-item>Home</h-breadcrumb-item>
    <h-breadcrumb-item>
      <h-dropdown>
        <h-button :text="true" type="normal">Sub Page1 <IconArrowDown size="12" class="ml-2" /></h-button>
        <h-dropdown-menu>
          <h-dropdown-item>Sub Page1-1</h-dropdown-item>
          <h-dropdown-item>Sub Page1-2</h-dropdown-item>
          <h-dropdown-item>Sub Page1-3</h-dropdown-item>
          <h-dropdown-item>Sub Page1-4</h-dropdown-item>
        </h-dropdown-menu>
      </h-dropdown>
    </h-breadcrumb-item>
    <h-breadcrumb-item>Sub Page2</h-breadcrumb-item>
  </h-breadcrumb>
</template>

<script setup lang="ts">
import { IconArrowDown } from '@aurora/icon';
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;
  align-items: center;
}

.h-button {
  padding: 0 6px;
}

:deep(.h-button__content) {
  display: inline-flex;
  align-items: center;
}
</style>
