<script setup lang="ts">
import { IconLogo } from '@aurora/icon';
import { $alert } from '@aurora/horizon-web';

function submit() {
  $alert('点击了确定', '提示');
}
</script>

<template>
  <n-result>
    <template #icon>
      <IconLogo size="56" :color="['var(--n-text-default)']" />
    </template>
    <template #title>
      尊贵的蔚来车主
    </template>
    <template #subtitle>
      本次换电已结束，感谢您的使用
    </template>
    <template #extra>
      <n-button @click="submit">确定</n-button>
    </template>
  </n-result>
</template>
