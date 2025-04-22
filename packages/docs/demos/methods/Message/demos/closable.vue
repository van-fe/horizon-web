<template>
  <n-button type="normal" plain @click="open2">成功</n-button>
  <n-button type="normal" plain @click="open3">警告</n-button>
  <n-button type="normal" plain @click="open1">消息</n-button>
  <n-button type="normal" plain @click="open4">错误</n-button>
</template>

<script lang="ts" setup>
import { $message } from '@nio-fe/lego';
const open1 = () => {
  $message({
    showClose: true,
    message: '这是一条提示消息',
  });
};
const open2 = () => {
  $message({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
const open3 = () => {
  $message({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning',
  });
};
const open4 = () => {
  $message({
    showClose: true,
    message: 'Oops, this is a error message.',
    type: 'error',
  });
};
</script>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
