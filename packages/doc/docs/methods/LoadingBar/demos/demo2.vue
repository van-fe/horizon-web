<template>
  <n-button :plain="true" @click="start">配置高度</n-button>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { $loadingBar } from '@nio-fe/lego';
$loadingBar.config({
  height: 2,
});
const start = () => {
  $loadingBar.start();
};
onUnmounted(() => {
  $loadingBar.destroy();
});
</script>
