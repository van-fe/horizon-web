<template>
  <div class="demo-wrapper">
    <n-link>Default</n-link>
    <n-link :loading="true">Loading text will replace me</n-link>
  </div>
</template>

<style scoped>
.demo-wrapper {
  display: flex;
  align-items: center;
}
</style>
