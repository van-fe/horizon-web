<template>
  <h-container class="commoh-container">
    <h-aside>Aside</h-aside>
    <h-main>Main</h-main>
  </h-container>
</template>

<style scoped>
.commoh-container {
  text-align: center;
}
.commoh-container .h-header {
  background: var(--h-bg-info-weak-default);
  display: flex;
  aligh-items: center;
  justify-content: center;
}

.commoh-container .VPDoc {
  height: 200px;
  background: var(--h-bg-warning-weak-default);
  display: flex;
  aligh-items: center;
  justify-content: center;
}

.commoh-container .h-footer {
  background: var(--h-bg-error-weak-default);
  display: flex;
  aligh-items: center;
  justify-content: center;
}

.commoh-container .h-aside {
  background: var(--h-bg-success-weak-default);
  display: flex;
  aligh-items: center;
  justify-content: center;
}
</style>
<script setup lang="ts">
</script>
