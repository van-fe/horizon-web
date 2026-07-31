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
        <h-avatar src="/demo-assets/avatar-coral.svg" />
        <div>
          骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试骨架屏测试
        </div>
        <h-button size="medium" type="primary">operate</h-button>
        <div>
          <img
            class="container"
            style="width: 200px; height: 200px"
            src="/demo-assets/scene-aurora.svg"
          />
        </div>
        <div class="container">
          <img
            class="container"
            src="/demo-assets/scene-aurora.svg"
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
