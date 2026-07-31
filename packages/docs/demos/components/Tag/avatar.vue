<template>
  <h-tag avatar="/demo-assets/avatar-indigo.svg" :plain="true" :round="true" :clickable="false" size="small">Elizabeth</h-tag>
  <h-tag avatar="/demo-assets/avatar-indigo.svg" :plain="true" :round="true" :clickable="false" size="medium">Jupiter</h-tag>
  <h-tag :plain="true" :round="true" :clickable="false" size="large">
    <template #avatar>
      <h-avatar src="/demo-assets/avatar-indigo.svg" :size="24" />
    </template>
    William
  </h-tag>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
