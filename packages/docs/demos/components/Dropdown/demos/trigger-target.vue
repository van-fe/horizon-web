<template>
  <n-row>
    <n-col :span="24">
      <n-dropdown>
        <n-button>使用 #suffix 插槽放置箭头
          <template #suffix>
            <div class="n-button__icon">
              <IconArrowDown />
            </div>
          </template>
        </n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item>北京</n-dropdown-item>
            <n-dropdown-item>上海</n-dropdown-item>
            <n-dropdown-item>深圳</n-dropdown-item>
            <n-dropdown-item>杭州</n-dropdown-item>
            <n-dropdown-item>重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
      <n-button-group>
        <n-button>使用 button-group 分割触发按钮</n-button>
        <n-dropdown>
          <n-button :icon="IconArrowDown" />
            <n-dropdown-menu>
              <n-dropdown-item>北京</n-dropdown-item>
              <n-dropdown-item>上海</n-dropdown-item>
              <n-dropdown-item>深圳</n-dropdown-item>
              <n-dropdown-item>杭州</n-dropdown-item>
              <n-dropdown-item>重庆</n-dropdown-item>
            </n-dropdown-menu>
          </n-dropdown>
      </n-button-group>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { IconArrowDown } from '@aurora/icon';
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;
}

.n-dropdown + .n-button-group {
  margin-left: 12px;
}
</style>
