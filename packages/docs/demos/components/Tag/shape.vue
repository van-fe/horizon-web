<template>
  <h-row :gutter="10">
    <h-col :span="12">
      <div class="demo-title">胶囊形</div>
      <h-tag :clickable="false" :round="true">Default</h-tag>
      <h-tag :clickable="false" :round="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :round="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :round="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :round="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="12">
      <div class="demo-title">正方形</div>
      <h-tag :clickable="false" :equally="true">普</h-tag>
      <h-tag :clickable="false" :equally="true" type="success">成</h-tag>
      <h-tag :clickable="false" :equally="true" type="info">进</h-tag>
      <h-tag :clickable="false" :equally="true" type="warning">警</h-tag>
      <h-tag :clickable="false" :equally="true" type="error">错</h-tag>
    </h-col>
  </h-row>
  <h-row :gutter="10">
    <h-col :span="12">
      <h-tag :clickable="false" :plain="true" :round="true">Default</h-tag>
      <h-tag :clickable="false" :plain="true" :round="true" type="success">Success</h-tag>
      <h-tag :clickable="false" :plain="true" :round="true" type="info">Info</h-tag>
      <h-tag :clickable="false" :plain="true" :round="true" type="warning">Warning</h-tag>
      <h-tag :clickable="false" :plain="true" :round="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="12">
      <h-tag :clickable="false" :plain="true" :equally="true">普</h-tag>
      <h-tag :clickable="false" :plain="true" :equally="true" type="success">成</h-tag>
      <h-tag :clickable="false" :plain="true" :equally="true" type="info">进</h-tag>
      <h-tag :clickable="false" :plain="true" :equally="true" type="warning">警</h-tag>
      <h-tag :clickable="false" :plain="true" :equally="true" type="error">错</h-tag>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
