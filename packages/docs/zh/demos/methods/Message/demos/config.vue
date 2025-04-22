<template>
  <n-space direction="vertical">
    <n-checkbox v-model="opened" @change="onToggle">启用全局配置(会影响所有message demo)</n-checkbox>
    <n-space v-if="opened">
      <div>延迟时间: {{ customize.duration }}</div>
      <div>最大数量: {{ customize.maxCount }}</div>
    </n-space>
    <n-space v-else>
      <div>延迟时间: 3000</div>
      <div>最大数量: Number.MAX_SAFE_INTEGER </div>
    </n-space>
    <n-space>
      <n-button type="normal" plain @click="open">new message</n-button>
      <n-button type="normal" plain @click="$message.closeAll">Close All</n-button>
    </n-space>
  </n-space>
</template>

<script lang="ts" setup>
import { $message } from '@nio-fe/lego';
import { ref } from 'vue';

const opened = ref(false);
const customize = { maxCount: 3, duration: 5000 };

const onToggle = () => {
  if (opened.value) {
    $message.config(customize);
  } else {
    $message.config({ duration: 3000, maxCount: Number.MAX_SAFE_INTEGER });
  }
};

const open = () => {
  $message.success(`This is a succeed message, current code: ${Math.random().toString(16).slice(2)}`);
};
</script>
