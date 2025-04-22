<template>
  <section class="main">
    <n-skeleton :loading="isLoading">
      <template #loadingTemplate>
        <NSkeletonItem shape="avatar"></NSkeletonItem>
        <NSkeletonItem shape="text"></NSkeletonItem>
        <NSkeletonItem shape="operate"></NSkeletonItem>
        <NSkeletonItem shape="button"></NSkeletonItem>
        <NSkeletonItem shape="image"></NSkeletonItem>
        <NSkeletonItem shape="picture"></NSkeletonItem>
      </template>
      <template #default>
        <n-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
        <div>
          骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试
        </div>
        <n-button size="medium" type="primary">operate</n-button>
        <div>
          <img
            class="container"
            style="width: 200px; height: 200px"
            src="https://www.nio.cn/cdn-static/mynio/images/nio-day-2021/nio-day-2021-playback-desktop.jpg"
          />
        </div>
        <div class="container">
          <img
            class="container"
            src="https://www.nio.cn/cdn-static/mynio/images/nio-day-2021/nio-day-2021-playback-desktop.jpg"
          />
        </div>
      </template>
    </n-skeleton>
  </section>
</template>

<script lang="ts" setup>
import { NSkeletonItem } from '@nio-fe/lego';
import { ref, onUnmounted } from 'vue';
const isLoading = ref(true);
const timer3 = setInterval(function () {
  isLoading.value = !isLoading.value;
}, 3000);
onUnmounted(() => {
  clearInterval(timer3);
});
</script>

<style scoped>
.container {
  height: 400px;
  width: 400px;
}
</style>
