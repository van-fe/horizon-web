<template>
  <div v-html="html1"></div>
  <div v-safe-html="html2"></div>
</template>

<script lang="ts" setup>
const html1 = `<span>some text</span>
  <img src=x onerror="console.info('XSS attack with v-html!')">`;
const html2 = `<span>some text</span>
  <img src=x onerror="console.info('XSS attack with v-safe-html!')">`;
</script>
