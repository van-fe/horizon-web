<script setup lang="ts">
import { ref } from 'vue';

const status = ref('尝试悬浮、点击或单击右键');
const actions = ['打开', '复制链接', '归档'];
</script>

<template>
  <div class="dropdown-trigger-demo">
    <h-space wrap>
      <h-dropdown @command="status = `悬浮菜单：${$event}`">
        <h-button type="normal">悬浮触发</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item v-for="action in actions" :key="action" :command="action">
              {{ action }}
            </h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>

      <h-dropdown trigger="click" @command="status = `点击菜单：${$event}`">
        <h-button>点击触发</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item v-for="action in actions" :key="action" :command="action">
              {{ action }}
            </h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-space>

    <h-dropdown trigger="context-menu" @command="status = `右键菜单：${$event}`">
      <div class="context-menu-area" tabindex="0">在此区域单击右键</div>
      <template #dropdown>
        <h-dropdown-menu>
          <h-dropdown-item command="新建便签">新建便签</h-dropdown-item>
          <h-dropdown-item command="粘贴内容">粘贴内容</h-dropdown-item>
          <h-dropdown-item command="查看详情">查看详情</h-dropdown-item>
        </h-dropdown-menu>
      </template>
    </h-dropdown>
    <p role="status">{{ status }}</p>
  </div>
</template>

<style scoped>
.dropdown-trigger-demo {
  display: grid;
  gap: 12px;
}

.context-menu-area {
  display: grid;
  min-height: 120px;
  place-content: center;
  border: 1px dashed var(--h-border-brand-default);
  color: var(--h-text-primary);
  text-align: center;
  cursor: context-menu;
}

.context-menu-area:focus-visible {
  outline: 2px solid var(--h-border-brand-default);
  outline-offset: 2px;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .context-menu-area {
    min-height: 100px;
  }
}
</style>
