<template>
  <n-breadcrumb>
    <n-breadcrumb-item>Home</n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-dropdown>
        <n-button :text="true" type="normal">Sub Page1 <IconArrowDown size="12" class="ml-2" /></n-button>
        <n-dropdown-menu>
          <n-dropdown-item>Sub Page1-1</n-dropdown-item>
          <n-dropdown-item>Sub Page1-2</n-dropdown-item>
          <n-dropdown-item>Sub Page1-3</n-dropdown-item>
          <n-dropdown-item>Sub Page1-4</n-dropdown-item>
        </n-dropdown-menu>
      </n-dropdown>
    </n-breadcrumb-item>
    <n-breadcrumb-item>Sub Page2</n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { IconArrowDown } from '@aurora/icon';
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;
  align-items: center;
}

.n-button {
  padding: 0 6px;
}

:deep(.n-button__content) {
  display: inline-flex;
  align-items: center;
}
</style>
