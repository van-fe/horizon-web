<script setup lang="ts">
import { ref } from 'vue';
const visible = ref(false);
const commands = [
  { id: 'search', label: '搜索项目', description: '查找文件和页面', shortcut: '⌘ P' },
  { id: 'theme', label: '切换主题', keywords: ['dark', 'light'] },
];
</script>
<template>
  <h-button @click="visible = true">打开命令面板</h-button>
  <h-command-palette v-model:visible="visible" :commands="commands" />
</template>
