<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-tag :clickable="false">Default</h-tag>
      <h-tag :clickable="false" type="success">Success</h-tag>
      <h-tag :clickable="false" type="info">Info</h-tag>
      <h-tag :clickable="false" type="warning">Warning</h-tag>
      <h-tag :clickable="false" type="error">Error</h-tag>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
