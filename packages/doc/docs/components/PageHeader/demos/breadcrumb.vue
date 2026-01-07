<template>
  <h-page-header :icon="null" title="页面标题">
    <template #breadcrumb>
      <h-breadcrumb :separator="IconArrowRight">
        <h-breadcrumb-item>首页</h-breadcrumb-item>
        <h-breadcrumb-item>子页面1</h-breadcrumb-item>
        <h-breadcrumb-item>子页面2</h-breadcrumb-item>
        <h-breadcrumb-item>子页面3</h-breadcrumb-item>
        <h-breadcrumb-item>当前页面</h-breadcrumb-item>
      </h-breadcrumb>
    </template>
  </h-page-header>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@aurora/icon';
</script>
