<template>
  <n-page-header :icon="null" title="页面标题">
    <template #breadcrumb>
      <n-breadcrumb :separator="IconArrowRight">
        <n-breadcrumb-item>首页</n-breadcrumb-item>
        <n-breadcrumb-item>子页面1</n-breadcrumb-item>
        <n-breadcrumb-item>子页面2</n-breadcrumb-item>
        <n-breadcrumb-item>子页面3</n-breadcrumb-item>
        <n-breadcrumb-item>当前页面</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <template #extra>
      <n-button :plain="true">副按钮</n-button>
      <n-button>主按钮</n-button>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@nio-fe/icon';
</script>

<style scoped>
</style>
