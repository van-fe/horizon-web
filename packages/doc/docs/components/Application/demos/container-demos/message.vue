<script setup lang="ts">
import { $message } from '@aurora/horizon-web';

const onClick = () => {
  $message.success('Hello World');
};
</script>
<template>
  <h-button @click="onClick">Click</h-button>
</template>
