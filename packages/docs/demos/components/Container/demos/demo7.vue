<template>
  <h-container class="common-container">
    <h-aside>Aside</h-aside>
    <h-container>
      <h-header>Header</h-header>
      <h-main>Main</h-main>
      <h-footer>Footer</h-footer>
    </h-container>
  </h-container>
</template>

<style scoped>
.common-container {
  text-align: center;
}
.common-container .h-header {
  background: var(--n-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}

.common-container .h-main {
  height: 200px;
  background: var(--n-bg-warning-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}

.common-container .h-footer {
  background: var(--n-bg-error-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}

.common-container .h-aside {
  background: var(--n-bg-success-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script setup lang="ts">
</script>
