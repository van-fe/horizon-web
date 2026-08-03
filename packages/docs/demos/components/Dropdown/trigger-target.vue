<script setup lang="ts">
import { ref } from 'vue';
import { IconArrowDown } from '@aurora/icon';

const selected = ref('选择一种发布操作');
</script>

<template>
  <div class="dropdown-target-demo">
    <h-space wrap>
      <h-dropdown @command="selected = String($event)">
        <h-button>
          选择环境
          <template #suffix><IconArrowDown /></template>
        </h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item command="环境：开发">开发环境</h-dropdown-item>
            <h-dropdown-item command="环境：预发布">预发布环境</h-dropdown-item>
            <h-dropdown-item command="环境：生产">生产环境</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>

      <h-button-group>
        <h-button @click="selected = '已发布到生产环境'">立即发布</h-button>
        <h-dropdown @command="selected = String($event)">
          <h-button :icon="IconArrowDown" aria-label="更多发布操作" />
          <h-dropdown-menu>
            <h-dropdown-item command="已设为定时发布">定时发布</h-dropdown-item>
            <h-dropdown-item command="已保存发布草稿">保存草稿</h-dropdown-item>
          </h-dropdown-menu>
        </h-dropdown>
      </h-button-group>
    </h-space>
    <p role="status">{{ selected }}</p>
  </div>
</template>

<style scoped>
.dropdown-target-demo {
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
  .dropdown-target-demo {
    gap: 10px;
  }
}
</style>
