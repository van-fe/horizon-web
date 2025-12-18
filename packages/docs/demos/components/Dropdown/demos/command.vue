<template>
  <n-row>
    <n-col :span="24">
      <n-dropdown @command="onCommand">
        <n-button>Hover</n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item command="北京">北京</n-dropdown-item>
            <n-dropdown-item @click="onCommand('上海')">上海</n-dropdown-item>
            <n-dropdown-item command="深圳">深圳</n-dropdown-item>
            <n-dropdown-item command="杭州" :disabled="true">杭州</n-dropdown-item>
            <n-dropdown-item @click="onCommand('重庆')">重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { $message } from '@aurora/horizon-web';

function onCommand(value: string) {
  $message.info(`点击了 ${value}`);
}
</script>
