<template>
  <n-button @click="open">Default Message</n-button>
</template>

<script lang="ts" setup>
import { $message } from '@nio-fe/lego';

const open = () => {
  $message({ message: 'This message will automatically close after 3 seconds.' });
};
</script>

<style scoped></style>
