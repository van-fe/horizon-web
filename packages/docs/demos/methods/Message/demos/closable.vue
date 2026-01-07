<template>
  <h-button type="normal" plain @click="open2">成功</h-button>
  <h-button type="normal" plain @click="open3">警告</h-button>
  <h-button type="normal" plain @click="open1">消息</h-button>
  <h-button type="normal" plain @click="open4">错误</h-button>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
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
.h-button + .h-button {
  margin-left: 10px;
}
</style>
