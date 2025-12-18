<template>
  <n-row>
    <n-col :span="24">
      <n-dropdown>
        <n-button>Hover(default)</n-button>
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
      <n-dropdown trigger="click">
        <n-button>Click</n-button>
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
      <n-dropdown trigger="context-menu" @command="onCommand">
        <div class="context-menu-area">
          context-menu
        </div>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item command="1">北京</n-dropdown-item>
            <n-dropdown-item command="2">上海</n-dropdown-item>
            <n-dropdown-item command="3">深圳</n-dropdown-item>
            <n-dropdown-item command="4">杭州</n-dropdown-item>
            <n-dropdown-item command="5">重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { $message } from '@aurora/horizon-web';

function onCommand(val: string) {
  $message.info(val);
}
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;
  vertical-align: top;
}

.n-dropdown + .n-dropdown {
  margin-left: 12px;
}

.context-menu-area {
  width: 300px;
  height: 200px;
  background: var(--n-bg-info-weak-default);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
