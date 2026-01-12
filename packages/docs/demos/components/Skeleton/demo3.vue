<template>
  <section class="main">
    <h-skeleton :loading="isLoading">
      <template #loadingTemplate>
        <h-skeleton-item shape="avatar"></h-skeleton-item>
        <h-skeleton-item shape="text"></h-skeleton-item>
        <h-skeleton-item shape="operate"></h-skeleton-item>
        <h-skeleton-item shape="button"></h-skeleton-item>
        <h-skeleton-item shape="image"></h-skeleton-item>
        <h-skeleton-item shape="picture"></h-skeleton-item>
      </template>
      <template #default>
        <h-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
        <div>
          骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试
        </div>
        <h-button size="medium" type="primary">operate</h-button>
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
    </h-skeleton>
  </section>
</template>

<script lang="ts" setup>
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
