<template>
  <n-tag avatar="https://source.niohome.com/UserPicture/default.jpg" :plain="true" :round="true" :clickable="false" size="small">Elizabeth</n-tag>
  <n-tag avatar="https://source.niohome.com/UserPicture/default.jpg" :plain="true" :round="true" :clickable="false" size="medium">Jupiter</n-tag>
  <n-tag :plain="true" :round="true" :clickable="false" size="large">
    <template #avatar>
      <n-avatar src="https://source.niohome.com/UserPicture/default.jpg" :size="24" />
    </template>
    William
  </n-tag>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
