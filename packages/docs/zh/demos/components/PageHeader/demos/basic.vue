<template>
  <n-page-header title="页面标题">
    <template #tags>
      <n-tag size="small" class="ml-2" :clickable="false">标签</n-tag>
    </template>
    <template #content>
      <div>ID: 0012138</div>
      <n-divider direction="vertical" />
      <div>所有者: Unknown</div>
      <n-divider direction="vertical" />
      <div>所属空间: DD</div>
    </template>
    <template #extra>
      <n-button size="large" :plain="true">副按钮</n-button>
      <n-button size="large">主按钮</n-button>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
