<template>
  <section class="main">
    <n-skeleton :loading="isLoading">
      <template #loadingTemplate>
        <NSkeletonItem shape="text" style="width: 30%"></NSkeletonItem>
        <NSkeletonItem shape="text" style="width: 20%"></NSkeletonItem>
        <NSkeletonItem shape="text" style="width: 60%"></NSkeletonItem>
      </template>
      <template #default>
        <div>骨架屏测试</div>
        <div>骨架屏</div>
        <div>骨架屏测试骨架屏测试骨架屏测试</div>
      </template>
    </n-skeleton>
  </section>
</template>

<script lang="ts" setup>
import { NSkeletonItem } from '@aurora/horizon-web';
import { ref, onUnmounted } from 'vue';
const isLoading = ref(true);
const timer2 = setInterval(function () {
  isLoading.value = !isLoading.value;
}, 3000);
onUnmounted(() => {
  clearInterval(timer2);
});
</script>
