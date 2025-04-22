<template>
  <n-row :gutter="10">
    <n-col :span="12">
      <div class="demo-title">胶囊形</div>
      <n-tag :clickable="false" :round="true">Default</n-tag>
      <n-tag :clickable="false" :round="true" type="success">Success</n-tag>
      <n-tag :clickable="false" :round="true" type="info">Info</n-tag>
      <n-tag :clickable="false" :round="true" type="warning">Warning</n-tag>
      <n-tag :clickable="false" :round="true" type="error">Error</n-tag>
    </n-col>
    <n-col :span="12">
      <div class="demo-title">正方形</div>
      <n-tag :clickable="false" :equally="true">普</n-tag>
      <n-tag :clickable="false" :equally="true" type="success">成</n-tag>
      <n-tag :clickable="false" :equally="true" type="info">进</n-tag>
      <n-tag :clickable="false" :equally="true" type="warning">警</n-tag>
      <n-tag :clickable="false" :equally="true" type="error">错</n-tag>
    </n-col>
  </n-row>
  <n-row :gutter="10">
    <n-col :span="12">
      <n-tag :clickable="false" :plain="true" :round="true">Default</n-tag>
      <n-tag :clickable="false" :plain="true" :round="true" type="success">Success</n-tag>
      <n-tag :clickable="false" :plain="true" :round="true" type="info">Info</n-tag>
      <n-tag :clickable="false" :plain="true" :round="true" type="warning">Warning</n-tag>
      <n-tag :clickable="false" :plain="true" :round="true" type="error">Error</n-tag>
    </n-col>
    <n-col :span="12">
      <n-tag :clickable="false" :plain="true" :equally="true">普</n-tag>
      <n-tag :clickable="false" :plain="true" :equally="true" type="success">成</n-tag>
      <n-tag :clickable="false" :plain="true" :equally="true" type="info">进</n-tag>
      <n-tag :clickable="false" :plain="true" :equally="true" type="warning">警</n-tag>
      <n-tag :clickable="false" :plain="true" :equally="true" type="error">错</n-tag>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
