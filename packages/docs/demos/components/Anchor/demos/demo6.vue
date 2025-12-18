<template>
  <div class="wrapper">
    <n-anchor
      :scroll-container="scrollContainer"
      link-target="_top"
      @click="clickHandle"
      @change="changeHandle"
    >
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

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const clickHandle = (linkInfo: { href: string; title: string }, e: MouseEvent) => {
      console.log(linkInfo, e);
    };
    const changeHandle = (link: string, prevLink: string) => {
      console.log(link, prevLink);
    };

    const scrollContainer = top?.document.querySelector('main.n-main');

    return {
      scrollContainer,
      clickHandle,
      changeHandle,
    };
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
