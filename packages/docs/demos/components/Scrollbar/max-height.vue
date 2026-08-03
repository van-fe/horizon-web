<script setup lang="ts">
import { computed, ref } from 'vue';

const mode = ref<'short' | 'long'>('short');
const allItems = Array.from({ length: 12 }, (_, index) => `Row ${index + 1}`);
const items = computed(() => allItems.slice(0, mode.value === 'short' ? 3 : 12));
</script>

<template>
  <section class="scrollbar-max-demo">
    <h-segmented v-model:active-key="mode" size="small" block aria-label="Content length">
      <h-segmented-item key="short" label="Short content" />
      <h-segmented-item key="long" label="Long content" />
    </h-segmented>
    <h-scrollbar class="scrollbar-max-demo__scroller" max-height="220px">
      <div class="scrollbar-max-demo__list">
        <div v-for="item in items" :key="item">{{ item }}</div>
      </div>
    </h-scrollbar>
  </section>
</template>

<style scoped>
.scrollbar-max-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.scrollbar-max-demo > :deep(.h-segmented) {
  max-inline-size: 360px;
}

.scrollbar-max-demo__scroller {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.scrollbar-max-demo__list {
  display: grid;
  padding-inline: var(--h-spacing-3);
}

.scrollbar-max-demo__list > div {
  min-block-size: 52px;
  padding: var(--h-spacing-3);
  border-bottom: 1px solid var(--h-divider-default);
  color: var(--h-text-secondary);
}
</style>
