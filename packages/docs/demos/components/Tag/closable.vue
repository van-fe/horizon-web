<template>
  <h-row>
    <h-col :span="24">
      <h-tag :clickable="false" :closable="true">Default</h-tag>
      <h-tag :clickable="false" :closable="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :closable="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :closable="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :closable="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :closable="true" :round="true" @click="onClick" @close="onClose">Default</h-tag>
      <h-tag :clickable="false" :closable="true" :round="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :closable="true" :round="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :closable="true" :round="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :closable="true" :round="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :closable="true" :plain="true">Default</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" @click="onClick" @close="onClose">普</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="success">成</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="info">进</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="warning">警</h-tag>
      <h-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="error">错</h-tag>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
function onClick() {
  console.info('click');
}

function onClose() {
  console.info('close');
}
</script>

<style scoped>
</style>
