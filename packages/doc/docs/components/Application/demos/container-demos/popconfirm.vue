<script setup lang="ts">
import { $message } from '@nio-fe/lego';

const onClick = () => {
  $message.success('Hello World');
};
</script>
<template>
  <n-button v-popconfirm @click="onClick">Click</n-button>
</template>
