<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown>
        <h-button>Hover(default)</h-button>
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
      <h-dropdown trigger="click">
        <h-button>Click</h-button>
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
      <h-dropdown trigger="context-menu" @command="onCommand">
        <div class="context-menu-area">
          context-menu
        </div>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item command="1">北京</h-dropdown-item>
            <h-dropdown-item command="2">上海</h-dropdown-item>
            <h-dropdown-item command="3">深圳</h-dropdown-item>
            <h-dropdown-item command="4">杭州</h-dropdown-item>
            <h-dropdown-item command="5">重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { $message } from '@aurora/horizon-web';

function onCommand(val: string) {
  $message.info(val);
}
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;
  vertical-align: top;
}

.h-dropdown + .h-dropdown {
  margin-left: 12px;
}

.context-menu-area {
  width: 300px;
  height: 200px;
  background: var(--h-bg-info-weak-default);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
