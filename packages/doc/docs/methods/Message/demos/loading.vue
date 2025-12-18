<template>
  <n-button type="normal" @click="open">加载</n-button>
</template>

<script lang="ts" setup>
import { $message } from '@nio-fe/lego';
const open = () => {
  const inst = $message.loading('After 2 seconds, the asynchronous operation will be completed');
  setTimeout(() => {
    inst.update({
      message: 'The asynchronous operation is completed',
      type: 'success',
      duration: 3000,
    });
  }, 2000);
};
</script>
