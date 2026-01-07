<template>
  <h-breadcrumb>
    <h-breadcrumb-item>Home</h-breadcrumb-item>
    <h-breadcrumb-item>
      <h-dropdown>
        <h-button :text="true" type="normal">Sub Page1 <IconArrowDown size="12" class="ml-2" /></h-button>
        <h-dropdowh-menu>
          <h-dropdowh-item>Sub Page1-1</h-dropdowh-item>
          <h-dropdowh-item>Sub Page1-2</h-dropdowh-item>
          <h-dropdowh-item>Sub Page1-3</h-dropdowh-item>
          <h-dropdowh-item>Sub Page1-4</h-dropdowh-item>
        </h-dropdowh-menu>
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
  aligh-items: center;
}

.h-button {
  padding: 0 6px;
}

:deep(.h-button__content) {
  display: inline-flex;
  aligh-items: center;
}
</style>
