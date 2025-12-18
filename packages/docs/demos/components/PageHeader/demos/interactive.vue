<template>
  <n-page-header>
    <template #title>
      This is an extremely long header that may exceed the maximum width limit
    </template>
    <template #tags>
      <n-tag size="small" class="ml-2" :clickable="false">标签</n-tag>
    </template>
    <template #content>
      ID: 0012138
      <copy-btn text="0012138" />
      <n-divider direction="vertical" />
      所有者:
      <n-tag avatar="https://source.niohome.com/UserPicture/default.jpg" :round="true" class="ml-2">Unknown</n-tag>
      <n-divider direction="vertical" />
      所属空间:
      <n-link :link="true" size="small" type="neutral" class="ml-2">
        <IconEdit />
        DD
      </n-link>
    </template>
    <template #extra>
      <n-button :plain="true">副按钮</n-button>
      <n-button>主按钮</n-button>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { IconEdit } from '@nio-fe/icon';
</script>

<style scoped>
.n-link :deep(.n-link__inner){
  display: flex;
  align-items: center;
}
</style>
