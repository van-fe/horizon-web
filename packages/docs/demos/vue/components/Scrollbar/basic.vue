<script setup lang="ts">
const items = Array.from({ length: 16 }, (_, index) => `Scrollable row ${index + 1}`);
</script>

<template>
  <h-scrollbar class="scrollbar-demo" height="260px">
    <div class="scrollbar-demo__list">
      <div v-for="item in items" :key="item">{{ item }}</div>
    </div>
  </h-scrollbar>
</template>

<style scoped>
.scrollbar-demo {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.scrollbar-demo__list {
  display: grid;
  padding-inline: var(--h-spacing-3);
}

.scrollbar-demo__list > div {
  padding: var(--h-spacing-3);
  border-bottom: 1px solid var(--h-divider-default);
  color: var(--h-text-secondary);
}
</style>
