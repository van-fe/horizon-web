<template>
  <n-button @click="onClick">Click Here</n-button>
</template>

<script setup lang="ts">
import { ${nameWithPrefix} } from '@nio-fe/lego';

function onClick() {
  ${nameWithPrefix}({});
}
</script>

<style scoped>
</style>
