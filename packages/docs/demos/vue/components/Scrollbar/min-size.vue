<script setup lang="ts">
const items = Array.from({ length: 160 }, (_, index) => `Long list row ${index + 1}`);
</script>

<template>
  <h-scrollbar class="scrollbar-min-demo" height="260px" :min-size="48">
    <div class="scrollbar-min-demo__list">
      <div v-for="item in items" :key="item">{{ item }}</div>
    </div>
  </h-scrollbar>
</template>

<style scoped>
.scrollbar-min-demo {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.scrollbar-min-demo__list {
  display: grid;
  padding-inline: var(--h-spacing-3);
}

.scrollbar-min-demo__list > div {
  min-block-size: 40px;
  padding: var(--h-spacing-2) var(--h-spacing-3);
  border-bottom: 1px solid var(--h-divider-default);
  color: var(--h-text-secondary);
}
</style>
