<template>
  <n-button :plain="true" @click="open2">成功</n-button>
  <n-button :plain="true" @click="open3">警告</n-button>
  <n-button :plain="true" @click="open1">消息</n-button>
  <n-button :plain="true" @click="open4">错误</n-button>
  <n-button :plain="true" @click="open5">加载</n-button>
</template>

<script lang="ts" setup>
import { $message } from '@nio-fe/lego';
const open1 = () => {
  $message('这是一条消息提示');
};
const open2 = () => {
  $message({
    message: '操作成功',
    type: 'success',
  });
};

const open3 = () => {
  $message({
    message: '操作警告',
    type: 'warning',
  });
};

const open4 = () => {
  $message.error('操作错误');
};
const open5 = () => {
  $message({
    message: '正在加载反馈',
    type: 'loading',
  });
};
</script>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
