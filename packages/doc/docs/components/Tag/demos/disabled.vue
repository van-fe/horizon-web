<template>
  <h-row>
    <h-col :span="24">
      <h-tag :clickable="false" :disabled="true" :closable="true">Default</h-tag>
      <h-tag :clickable="false" :disabled="true" type="success" :closable="true">Success</h-tag>
      <h-tag :clickable="false" :disabled="true" type="info" :closable="true">Info</h-tag>
      <h-tag :clickable="false" :disabled="true" type="warning" :closable="true">Warning</h-tag>
      <h-tag :clickable="false" :disabled="true" type="error" :closable="true">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :disabled="true" :round="true" :closable="true">Default</h-tag>
      <h-tag :clickable="false" :disabled="true" :round="true" type="success" :closable="true">Success</h-tag>
      <h-tag :clickable="false" :disabled="true" :round="true" type="info" :closable="true">Info</h-tag>
      <h-tag :clickable="false" :disabled="true" :round="true" type="warning" :closable="true">Warning</h-tag>
      <h-tag :clickable="false" :disabled="true" :round="true" type="error" :closable="true">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :disabled="true" :plain="true" :closable="true">Default</h-tag>
      <h-tag :clickable="false" :disabled="true" :plain="true" type="success" :closable="true">Success</h-tag>
      <h-tag :clickable="false" :disabled="true" :plain="true" type="info" :closable="true">Info</h-tag>
      <h-tag :clickable="false" :disabled="true" :plain="true" type="warning" :closable="true">Warning</h-tag>
      <h-tag :clickable="false" :disabled="true" :plain="true" type="error" :closable="true">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :disabled="true" :equally="true" :closable="true">普</h-tag>
      <h-tag :clickable="false" :disabled="true" :equally="true" type="success" :closable="true">成</h-tag>
      <h-tag :clickable="false" :disabled="true" :equally="true" type="info" :closable="true">进</h-tag>
      <h-tag :clickable="false" :disabled="true" :equally="true" type="warning" :closable="true">警</h-tag>
      <h-tag :clickable="false" :disabled="true" :equally="true" type="error" :closable="true">错</h-tag>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
