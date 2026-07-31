<template>
  <h-space direction="vertical" size="large">
    <h-button @click="spinning = !spinning">切换加载状态</h-button>
    <h-spin :spinning="spinning" :delay="150" tip="正在刷新数据">
      <h-card title="异步内容" style="min-height: 140px">
        内容始终保留在 DOM 中，加载完成后遮罩自动移除。
      </h-card>
    </h-spin>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const spinning = ref(true);
</script>
