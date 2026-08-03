<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-dropdown @command="onCommand">
        <h-button>Hover</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item command="北京">北京</h-dropdown-item>
            <h-dropdown-item @click="onCommand('上海')">上海</h-dropdown-item>
            <h-dropdown-item command="深圳">深圳</h-dropdown-item>
            <h-dropdown-item command="杭州" :disabled="true">杭州</h-dropdown-item>
            <h-dropdown-item @click="onCommand('重庆')">重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { $message } from '@aurora/horizon-web';

function onCommand(value: string) {
  $message.info(`点击了 ${value}`);
}
</script>
