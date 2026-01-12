<template>
  <h-tag avatar="https://source.niohome.com/UserPicture/default.jpg" :plain="true" :round="true" :clickable="false" size="small">Elizabeth</h-tag>
  <h-tag avatar="https://source.niohome.com/UserPicture/default.jpg" :plain="true" :round="true" :clickable="false" size="medium">Jupiter</h-tag>
  <h-tag :plain="true" :round="true" :clickable="false" size="large">
    <template #avatar>
      <h-avatar src="https://source.niohome.com/UserPicture/default.jpg" :size="24" />
    </template>
    William
  </h-tag>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
