<script setup lang="ts">
import { IconArrowDown, IconAdd } from '@nio-fe/icon';
</script>

<template>
  <n-dropdown>
    <n-button>dropdown 下拉菜单触发按钮
      <template #suffix>
        <div class="n-button__icon">
          <IconArrowDown />
        </div>
      </template>
    </n-button>
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

  <div class="mt-2">
    <n-dropdown trigger="click" >
      <n-button :icon="IconAdd" :auto-fit="true">
        <template #suffix>
          <IconArrowDown size="14" />
        </template>
      </n-button>
      <template #dropdown>
        <n-dropdown-menu>
          <n-dropdown-item value="upload">新建文件夹</n-dropdown-item>
        </n-dropdown-menu>
      </template>
    </n-dropdown>
  </div>

</template>

<style scoped>

</style>
