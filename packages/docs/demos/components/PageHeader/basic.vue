<template>
  <h-page-header title="页面标题">
    <template #tags>
      <h-tag size="small" class="ml-2" :clickable="false">标签</h-tag>
    </template>
    <template #content>
      <div>ID: 0012138</div>
      <h-divider direction="vertical" />
      <div>所有者: Unknown</div>
      <h-divider direction="vertical" />
      <div>所属空间: DD</div>
    </template>
    <template #extra>
      <h-button size="large" :plain="true">副按钮</h-button>
      <h-button size="large">主按钮</h-button>
    </template>
  </h-page-header>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
