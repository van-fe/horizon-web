<template>
  <n-button type="normal" @click="openHTML">使用 HTML 字符串</n-button>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';

const openHTML = () => {
  $message({
    useHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  });
};
</script>
