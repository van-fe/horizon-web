<script setup lang="ts">
import { IconLoading } from '@aurora/icon';
</script>

<template>
  <n-result title="这是一条自定义Icon的消息" subtitle="这是一段相关的描述文案" :secondary-button="false">
    <template #icon>
      <IconLoading size="56" spin="cw" />
    </template>
  </n-result>
</template>
