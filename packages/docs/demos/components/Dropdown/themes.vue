<script setup lang="ts">
import { ref } from 'vue';

const theme = ref<'default' | 'gray' | 'midnight'>('default');
const selected = ref('切换主题后打开菜单');
const themes = ['default', 'gray', 'midnight'];
</script>

<template>
  <div class="dropdown-theme-demo">
    <div class="controls">
      <h-segmented v-model:active-key="theme" size="small">
        <h-segmented-item v-for="item in themes" :key="item" :value="item" :label="item" />
      </h-segmented>
      <h-dropdown :theme="theme" @command="selected = `${theme}：${$event}`">
        <h-button>打开菜单</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item command="产品设计">产品设计</h-dropdown-item>
            <h-dropdown-item command="工程研发">工程研发</h-dropdown-item>
            <h-dropdown-item command="归档空间" disabled>归档空间</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </div>
    <p role="status">{{ selected }}</p>
  </div>
</template>

<style scoped>
.dropdown-theme-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

.controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .controls {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
