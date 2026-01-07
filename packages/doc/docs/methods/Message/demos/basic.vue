<template>
  <h-button type="normal" @click="open">默认消息</h-button>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';

const open = () => {
  $message({ message: 'This message will automatically close after 3 seconds.' });
};
</script>

<style scoped></style>
