<template>
  <n-row>
    <n-col :span="24">
      <n-tag :clickable="false" :disabled="true" :closable="true">Default</n-tag>
      <n-tag :clickable="false" :disabled="true" type="success" :closable="true">Success</n-tag>
      <n-tag :clickable="false" :disabled="true" type="info" :closable="true">Info</n-tag>
      <n-tag :clickable="false" :disabled="true" type="warning" :closable="true">Warning</n-tag>
      <n-tag :clickable="false" :disabled="true" type="error" :closable="true">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :disabled="true" :round="true" :closable="true">Default</n-tag>
      <n-tag :clickable="false" :disabled="true" :round="true" type="success" :closable="true">Success</n-tag>
      <n-tag :clickable="false" :disabled="true" :round="true" type="info" :closable="true">Info</n-tag>
      <n-tag :clickable="false" :disabled="true" :round="true" type="warning" :closable="true">Warning</n-tag>
      <n-tag :clickable="false" :disabled="true" :round="true" type="error" :closable="true">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :disabled="true" :plain="true" :closable="true">Default</n-tag>
      <n-tag :clickable="false" :disabled="true" :plain="true" type="success" :closable="true">Success</n-tag>
      <n-tag :clickable="false" :disabled="true" :plain="true" type="info" :closable="true">Info</n-tag>
      <n-tag :clickable="false" :disabled="true" :plain="true" type="warning" :closable="true">Warning</n-tag>
      <n-tag :clickable="false" :disabled="true" :plain="true" type="error" :closable="true">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :disabled="true" :equally="true" :closable="true">普</n-tag>
      <n-tag :clickable="false" :disabled="true" :equally="true" type="success" :closable="true">成</n-tag>
      <n-tag :clickable="false" :disabled="true" :equally="true" type="info" :closable="true">进</n-tag>
      <n-tag :clickable="false" :disabled="true" :equally="true" type="warning" :closable="true">警</n-tag>
      <n-tag :clickable="false" :disabled="true" :equally="true" type="error" :closable="true">错</n-tag>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
