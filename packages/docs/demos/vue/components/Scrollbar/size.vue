<script setup lang="ts">
import { ref } from 'vue';

const size = ref<'small' | 'medium'>('medium');
const items = Array.from({ length: 12 }, (_, index) => `版本 v2.${12 - index}.0`);
</script>

<template>
  <section class="scrollbar-size-demo">
    <h-segmented v-model:active-key="size" size="small" block aria-label="Scrollbar size">
      <h-segmented-item value="small" label="Small" />
      <h-segmented-item value="medium" label="Medium" />
    </h-segmented>
    <h-scrollbar class="scrollbar-size-demo__scroller" :size="size" height="220px">
      <div class="version-list">
        <div v-for="item in items" :key="item">{{ item }}</div>
      </div>
    </h-scrollbar>
  </section>
</template>

<style scoped>
.scrollbar-size-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.scrollbar-size-demo > :deep(.h-segmented) {
  max-inline-size: 320px;
}

.scrollbar-size-demo__scroller {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.version-list {
  display: grid;
  padding-inline: var(--h-spacing-3);
}

.version-list > div {
  padding: var(--h-spacing-3);
  border-bottom: 1px solid var(--h-divider-default);
  color: var(--h-text-secondary);
}
</style>
