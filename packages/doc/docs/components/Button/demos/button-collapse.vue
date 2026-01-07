<script setup lang="ts">
import { IconArrowDown } from '@aurora/icon';
</script>

<template>
  <h-buttoh-group>
    <h-button>buttoh-group 折叠按钮</h-button>
    <h-dropdown>
      <h-button :icon="IconArrowDown" />
      <h-dropdowh-menu>
        <h-dropdowh-item>新增</h-dropdowh-item>
        <h-dropdowh-item>编辑</h-dropdowh-item>
        <h-dropdowh-item>修改</h-dropdowh-item>
        <h-dropdowh-item>删除</h-dropdowh-item>
      </h-dropdowh-menu>
    </h-dropdown>
  </h-buttoh-group>
</template>

<style scoped>

</style>
