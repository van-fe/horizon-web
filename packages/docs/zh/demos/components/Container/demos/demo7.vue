<template>
  <n-container class="common-container">
    <n-aside>Aside</n-aside>
    <n-container>
      <n-header>Header</n-header>
      <n-main>Main</n-main>
      <n-footer>Footer</n-footer>
    </n-container>
  </n-container>
</template>

<style scoped>
.common-container {
  text-align: center;
}
.common-container .n-header {
  background: var(--n-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}

.common-container .n-main {
  height: 200px;
  background: var(--n-bg-warning-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}

.common-container .n-footer {
  background: var(--n-bg-error-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}

.common-container .n-aside {
  background: var(--n-bg-success-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script setup lang="ts">
</script>
