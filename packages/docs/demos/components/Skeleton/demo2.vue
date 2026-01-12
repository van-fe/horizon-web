<template>
  <section class="main">
    <h-skeleton :loading="isLoading">
      <template #loadingTemplate>
        <h-skeleton-item shape="text" style="width: 30%"></h-skeleton-item>
        <h-skeleton-item shape="text" style="width: 20%"></h-skeleton-item>
        <h-skeleton-item shape="text" style="width: 60%"></h-skeleton-item>
      </template>
      <template #default>
        <div>骨架屏测试</div>
        <div>骨架屏</div>
        <div>骨架屏测试骨架屏测试骨架屏测试</div>
      </template>
    </h-skeleton>
  </section>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
const isLoading = ref(true);
const timer2 = setInterval(function () {
  isLoading.value = !isLoading.value;
}, 3000);
onUnmounted(() => {
  clearInterval(timer2);
});
</script>
