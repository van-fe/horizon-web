<template>
  <n-button @click="onClick">Click Here</n-button>
</template>

<script setup lang="ts">
import { ${nameWithPrefix} } from '@aurora/horizon-web';

function onClick() {
  ${nameWithPrefix}({});
}
</script>

<style scoped>
</style>
