<template>
  <div class="delay-demo">
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
        delay: 1000,
      }"
      class="loading-container"
    >
      延迟1000ms显示
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
      }"
      class="loading-container"
    >
      没有延迟
    </div>
    <n-button v-if="!isShow" @click="isShow = true">开始加载</n-button>
    <n-button v-if="!isShow" @click="delayShow">开始加载并在1000ms内结束</n-button>
    <n-button v-if="isShow" @click="isShow = false">结束加载</n-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isShow = ref(false);

function delayShow() {
  isShow.value = true;
  setTimeout(() => {
    isShow.value = false;
  }, 800);
}
</script>

<style scoped>
.n-button + .n-button {
  margin-left: 20px;
}

.loading-container {
  width: 150px;
  height: 150px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.loading-container + .loading-container {
  margin-left: 20px;
}
</style>
