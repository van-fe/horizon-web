<script setup lang="ts">
const items = Array.from({ length: 14 }, (_, index) => `Always-visible row ${index + 1}`);
</script>

<template>
  <h-scrollbar class="scrollbar-always-demo" height="240px" always>
    <div class="scrollbar-always-demo__list">
      <div v-for="item in items" :key="item">{{ item }}</div>
    </div>
  </h-scrollbar>
</template>

<style scoped>
.scrollbar-always-demo {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.scrollbar-always-demo__list {
  display: grid;
  padding-inline: var(--h-spacing-3);
}

.scrollbar-always-demo__list > div {
  padding: var(--h-spacing-3);
  border-bottom: 1px solid var(--h-divider-default);
  color: var(--h-text-secondary);
}
</style>
