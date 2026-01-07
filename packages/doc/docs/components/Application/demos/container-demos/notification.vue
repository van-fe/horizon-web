<script setup lang="ts">
import { $notify } from '@aurora/horizon-web';

const onClick = () => {
  $notify({ type: 'success', title: 'Hi bro', content: 'Hello World' });
};
</script>
<template>
  <h-button @click="onClick">Click</h-button>
</template>
