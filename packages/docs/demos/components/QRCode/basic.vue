<script setup lang="ts">
import { ref } from 'vue';
const expired = ref(false);
</script>
<template>
  <h-space direction="vertical">
    <h-q-r-code value="https://github.com/" :expired="expired" @refresh="expired = false" />
    <h-switch v-model="expired" />
  </h-space>
</template>
