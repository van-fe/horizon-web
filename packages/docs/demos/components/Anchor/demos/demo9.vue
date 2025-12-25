<script setup lang="ts">
const scrollContainer = top?.document.querySelector('main.n-main');

const collapseUpdateHandle = (collapse: boolean) => {
  console.info('是否处于折叠状态: ', collapse);
};
</script>

<template>
  <div class="wrapper">
    <n-anchor :scroll-container="scrollContainer" link-target="_top" :use-collapse="true" @update:collapse="collapseUpdateHandle">
      <n-anchor-link href="#设置尺寸" title="设置尺寸" />
      <n-anchor-link href="#是否改变hash" title="是否改变hash" />
      <n-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <n-anchor-link href="#设置偏移量" title="设置偏移量" />
      <n-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <n-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <n-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </n-anchor>
    <div class="split"></div>
    <n-anchor :scroll-container="scrollContainer" link-target="_top" :use-collapse="true" :collapse-text="'展开全部内容'" @update:collapse="collapseUpdateHandle">
      <n-anchor-link href="#设置尺寸" title="设置尺寸" />
      <n-anchor-link href="#是否改变hash" title="是否改变hash" />
      <n-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <n-anchor-link href="#设置偏移量" title="设置偏移量" />
      <n-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <n-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <n-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </n-anchor>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 30px;
}
.split {
  width: 60px;
}
</style>
