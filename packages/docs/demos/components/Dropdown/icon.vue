<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown>
        <h-button>Hover</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item icon="car">北京</h-dropdown-item>
            <h-dropdown-item :icon="IconSearch">上海</h-dropdown-item>
            <h-dropdown-item icon="applets">深圳</h-dropdown-item>
            <h-dropdown-item icon="gift">杭州</h-dropdown-item>
            <h-dropdown-item>
              <template #icon>
                <IconCollection size="16" />
              </template>
              重庆
            </h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { IconSearch, IconCollection } from '@aurora/icon';
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-dropdown + .h-dropdown {
  margin-left: 12px;
}
</style>
