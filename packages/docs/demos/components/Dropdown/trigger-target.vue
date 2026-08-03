<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-dropdown>
        <h-button>使用 #suffix 插槽放置箭头
          <template #suffix>
            <div class="h-button__icon">
              <IconArrowDown />
            </div>
          </template>
        </h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item>北京</h-dropdown-item>
            <h-dropdown-item>上海</h-dropdown-item>
            <h-dropdown-item>深圳</h-dropdown-item>
            <h-dropdown-item>杭州</h-dropdown-item>
            <h-dropdown-item>重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
      <h-button-group>
        <h-button>使用 button-group 分割触发按钮</h-button>
        <h-dropdown>
          <h-button :icon="IconArrowDown" />
            <h-dropdown-menu>
              <h-dropdown-item>北京</h-dropdown-item>
              <h-dropdown-item>上海</h-dropdown-item>
              <h-dropdown-item>深圳</h-dropdown-item>
              <h-dropdown-item>杭州</h-dropdown-item>
              <h-dropdown-item>重庆</h-dropdown-item>
            </h-dropdown-menu>
          </h-dropdown>
      </h-button-group>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { IconArrowDown } from '@aurora/icon';
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-dropdown + .h-button-group {
  margin-left: 12px;
}
</style>
