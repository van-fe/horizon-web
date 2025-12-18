<template>
  <n-button :plain="true" class="btn-common" @click="start">开始</n-button>
  <n-button :plain="true" class="btn-common" @click="finish">结束</n-button>
  <n-button :plain="true" class="btn-common" type="danger" @click="error">错误</n-button>
  <n-button :plain="true" class="btn-common" @click="update">更新指定进度</n-button>
  <n-button :plain="true" class="btn-common" type="danger" @click="destroy">销毁</n-button>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { $loadingBar } from '@nio-fe/lego';
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
.btn-common {
  margin-right: 16px;
}
</style>
