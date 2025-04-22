<script setup lang="ts">
import { $notify } from '@nio-fe/lego';

const onClick = () => {
  $notify({ type: 'success', title: 'Hi bro', content: 'Hello World' });
};
</script>
<template>
  <n-button @click="onClick">Click</n-button>
</template>
