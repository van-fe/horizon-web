<template>
  <h-button @click="onClick">Click Here</h-button>
</template>

<script setup lang="ts">
import { ${nameWithPrefix} } from '@aurora/horizon-web';

function onClick() {
  ${nameWithPrefix}({});
}
</script>

<style scoped>
</style>
