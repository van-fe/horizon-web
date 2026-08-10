<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('请选择一种创建方式');
const actions = [
  { label: '新建页面', command: '页面' },
  { label: '新建数据表', command: '数据表' },
  { label: '从模板导入', command: '模板' },
];
</script>

<template>
  <div class="dropdown-basic-demo">
    <h-space wrap>
      <h-dropdown @command="selected = `插槽写法：${$event}`">
        <h-button>插槽写法</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item v-for="item in actions" :key="item.command" :command="item.command">
              {{ item.label }}
            </h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>

      <h-dropdown @command="selected = `直接子节点：${$event}`">
        <h-button type="normal">直接子节点</h-button>
        <h-dropdown-menu>
          <h-dropdown-item command="复制链接">复制链接</h-dropdown-item>
          <h-dropdown-item command="移动项目">移动项目</h-dropdown-item>
          <h-dropdown-item command="归档项目">归档项目</h-dropdown-item>
        </h-dropdown-menu>
      </h-dropdown>
    </h-space>
    <p role="status">{{ selected }}</p>
  </div>
</template>

<style scoped>
.dropdown-basic-demo {
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
  .dropdown-basic-demo {
    gap: 10px;
  }
}
</style>
