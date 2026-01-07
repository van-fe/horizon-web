<template>
  <div class="demo-wrapper">
    <h-link>Default</h-link>
    <h-link :loading="true">Loading text will replace me</h-link>
  </div>
</template>

<style scoped>
.demo-wrapper {
  display: flex;
  align-items: center;
}
</style>
