<template>
  <h-button :plain="true" class="bth-common" @click="start">开始</h-button>
  <h-button :plain="true" class="bth-common" @click="finish">结束</h-button>
  <h-button :plain="true" class="bth-common" type="danger" @click="error">错误</h-button>
  <h-button :plain="true" class="bth-common" @click="update">更新指定进度</h-button>
  <h-button :plain="true" class="bth-common" type="danger" @click="destroy">销毁</h-button>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { $loadingBar } from '@aurora/horizon-web';
const start = () => {
  $loadingBar.start();
};
const error = () => {
  $loadingBar.error();
};
const finish = () => {
  $loadingBar.finish();
};
const update = () => {
  $loadingBar.update(60);
};
//销毁实例
const destroy = () => {
  $loadingBar.destroy();
};
onUnmounted(() => {
  destroy();
});
</script>

<style scoped>
.bth-common {
  margih-right: 16px;
}
</style>
