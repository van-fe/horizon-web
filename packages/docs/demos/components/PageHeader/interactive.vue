<template>
  <h-page-header>
    <template #title>
      This is an extremely long header that may exceed the maximum width limit
    </template>
    <template #tags>
      <h-tag size="small" class="ml-2" :clickable="false">标签</h-tag>
    </template>
    <template #content>
      ID: 0012138
      <copy-btn text="0012138" />
      <h-divider direction="vertical" />
      所有者:
      <h-tag avatar="https://source.niohome.com/UserPicture/default.jpg" :round="true" class="ml-2">Unknown</h-tag>
      <h-divider direction="vertical" />
      所属空间:
      <h-link :link="true" size="small" type="neutral" class="ml-2">
        <IconEdit />
        DD
      </h-link>
    </template>
    <template #extra>
      <h-button :plain="true">副按钮</h-button>
      <h-button>主按钮</h-button>
    </template>
  </h-page-header>
</template>

<script setup lang="ts">
import { IconEdit } from '@aurora/icon';
</script>

<style scoped>
.h-link :deep(.h-link__inner){
  display: flex;
  align-items: center;
}
</style>
