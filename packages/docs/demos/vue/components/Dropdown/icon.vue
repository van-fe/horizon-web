<script setup lang="ts">
import { ref } from 'vue';
import { IconCollection, IconSearch } from '@aurora/icon';

const action = ref('选择一项快捷操作');
</script>

<template>
  <div class="dropdown-icon-demo">
    <h-dropdown @command="action = `已执行：${$event}`">
      <h-button>快捷操作</h-button>
      <template #dropdown>
        <h-dropdown-menu>
          <h-dropdown-item icon="car" command="查看交付进度">查看交付进度</h-dropdown-item>
          <h-dropdown-item :icon="IconSearch" command="搜索订单">搜索订单</h-dropdown-item>
          <h-dropdown-item command="加入收藏">
            <template #icon><IconCollection size="16" /></template>
            加入收藏
          </h-dropdown-item>
        </h-dropdown-menu>
      </template>
    </h-dropdown>
    <p role="status">{{ action }}</p>
  </div>
</template>

<style scoped>
.dropdown-icon-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .dropdown-icon-demo {
    gap: 10px;
  }
}
</style>
