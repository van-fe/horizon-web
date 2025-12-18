<template>
  <n-row>
    <n-col :span="24">
      <n-tag :clickable="false" :closable="true">Default</n-tag>
      <n-tag :clickable="false" :closable="true" type="success">Success</n-tag>
      <n-tag :clickable="false" :closable="true" type="info">Info</n-tag>
      <n-tag :clickable="false" :closable="true" type="warning">Warning</n-tag>
      <n-tag :clickable="false" :closable="true" type="error">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :closable="true" :round="true" @click="onClick" @close="onClose">Default</n-tag>
      <n-tag :clickable="false" :closable="true" :round="true" type="success">Success</n-tag>
      <n-tag :clickable="false" :closable="true" :round="true" type="info">Info</n-tag>
      <n-tag :clickable="false" :closable="true" :round="true" type="warning">Warning</n-tag>
      <n-tag :clickable="false" :closable="true" :round="true" type="error">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :closable="true" :plain="true">Default</n-tag>
      <n-tag :clickable="false" :closable="true" :plain="true" type="success">Success</n-tag>
      <n-tag :clickable="false" :closable="true" :plain="true" type="info">Info</n-tag>
      <n-tag :clickable="false" :closable="true" :plain="true" type="warning">Warning</n-tag>
      <n-tag :clickable="false" :closable="true" :plain="true" type="error">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :clickable="false" :closable="true" :plain="true" :equally="true" @click="onClick" @close="onClose">普</n-tag>
      <n-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="success">成</n-tag>
      <n-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="info">进</n-tag>
      <n-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="warning">警</n-tag>
      <n-tag :clickable="false" :closable="true" :plain="true" :equally="true" type="error">错</n-tag>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
function onClick() {
  console.log('click');
}

function onClose() {
  console.log('close');
}
</script>

<style scoped>
</style>
