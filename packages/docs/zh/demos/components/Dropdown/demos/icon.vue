<template>
  <n-row>
    <n-col :span="24">
      <n-dropdown>
        <n-button>Hover</n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item icon="car">北京</n-dropdown-item>
            <n-dropdown-item :icon="IconSearch">上海</n-dropdown-item>
            <n-dropdown-item icon="applets">深圳</n-dropdown-item>
            <n-dropdown-item icon="gift">杭州</n-dropdown-item>
            <n-dropdown-item>
              <template #icon>
                <IconCollection size="16" />
              </template>
              重庆
            </n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { IconSearch, IconCollection } from '@aurora/icon';
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;
}

.n-dropdown + .n-dropdown {
  margin-left: 12px;
}
</style>
