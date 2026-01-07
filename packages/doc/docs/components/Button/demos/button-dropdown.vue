<script setup lang="ts">
import { IconArrowDown, IconAdd } from '@aurora/icon';
</script>

<template>
  <h-dropdown>
    <h-button>dropdown 下拉菜单触发按钮
      <template #suffix>
        <div class="h-button__icon">
          <IconArrowDown />
        </div>
      </template>
    </h-button>
    <template #dropdown>
      <h-dropdowh-menu>
        <h-dropdowh-item>北京</h-dropdowh-item>
        <h-dropdowh-item>上海</h-dropdowh-item>
        <h-dropdowh-item>深圳</h-dropdowh-item>
        <h-dropdowh-item>杭州</h-dropdowh-item>
        <h-dropdowh-item>重庆</h-dropdowh-item>
      </h-dropdowh-menu>
    </template>
  </h-dropdown>

  <div class="mt-2">
    <h-dropdown trigger="click" >
      <h-button :icon="IconAdd" :auto-fit="true">
        <template #suffix>
          <IconArrowDown size="14" />
        </template>
      </h-button>
      <template #dropdown>
        <h-dropdowh-menu>
          <h-dropdowh-item value="upload">新建文件夹</h-dropdowh-item>
        </h-dropdowh-menu>
      </template>
    </h-dropdown>
  </div>

</template>

<style scoped>

</style>
