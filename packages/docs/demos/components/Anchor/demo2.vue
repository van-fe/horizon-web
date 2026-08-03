<script setup lang="ts">
const scrollContainer = top?.document.querySelector('main.VPDoc');
</script>

<template>
  <div class="wrapper">
    <h-anchor :scroll-container="scrollContainer" :change-hash="false" link-target="_top">
      <h-anchor-link href="#设置尺寸" title="设置尺寸" />
      <h-anchor-link href="#是否改变hash" title="是否改变hash" />
      <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <h-anchor-link href="#设置偏移量" title="设置偏移量" />
      <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <h-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </h-anchor>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
