<script setup lang="ts">
import { IconArrowDown } from '@nio-fe/icon';
</script>

<template>
  <n-button-group>
    <n-button>button-group 折叠按钮</n-button>
    <n-dropdown>
      <n-button :icon="IconArrowDown" />
      <n-dropdown-menu>
        <n-dropdown-item>新增</n-dropdown-item>
        <n-dropdown-item>编辑</n-dropdown-item>
        <n-dropdown-item>修改</n-dropdown-item>
        <n-dropdown-item>删除</n-dropdown-item>
      </n-dropdown-menu>
    </n-dropdown>
  </n-button-group>
</template>

<style scoped>

</style>
