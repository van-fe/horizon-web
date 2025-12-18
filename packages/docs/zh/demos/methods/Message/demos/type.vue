<template>
  <n-space>
    <n-button type="normal" plain @click="open2">成功</n-button>
    <n-button type="normal" plain @click="open3">警告</n-button>
    <n-button type="normal" plain @click="open1">消息</n-button>
    <n-button type="normal" plain @click="open4">错误</n-button>
  </n-space>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
const open1 = () => {
  $message.info('这是一条消息提示');
};
const open2 = () => {
  $message.success('操作成功');
};

const open3 = () => {
  $message.warning('操作警告');
};

const open4 = () => {
  $message.error('操作错误');
};
</script>
