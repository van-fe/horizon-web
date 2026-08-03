<script setup lang="ts">
import { IconLogo } from '@aurora/icon';
import { $alert } from '@aurora/horizon-web';

function submit() {
  $alert('点击了确定', '提示');
}
</script>

<template>
  <h-result>
    <template #icon>
      <IconLogo size="56" :color="['var(--h-text-default)']" />
    </template>
    <template #title>
      尊贵的示例车主
    </template>
    <template #subtitle>
      本次换电已结束，感谢您的使用
    </template>
    <template #extra>
      <h-button @click="submit">确定</h-button>
    </template>
  </h-result>
</template>
