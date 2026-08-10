<script setup lang="ts">
import { ref } from 'vue';

interface ScrollbarExpose {
  setScrollTop: (value: number) => void;
  setScrollLeft: (value: number) => void;
}

const scrollbar = ref<ScrollbarExpose | null>(null);
const items = Array.from({ length: 14 }, (_, index) => `Scrollable row ${index + 1}`);
</script>

<template>
  <section class="scrollbar-manual-demo">
    <div class="scrollbar-manual-demo__actions">
      <h-button size="small" type="normal" @click="scrollbar?.setScrollTop(220)">
        Set top: 220px
      </h-button>
      <h-button size="small" type="normal" @click="scrollbar?.setScrollLeft(280)">
        Set left: 280px
      </h-button>
    </div>
    <h-scrollbar ref="scrollbar" class="scrollbar-manual-demo__scroller" height="240px">
      <div class="scrollbar-manual-demo__content">
        <div v-for="item in items" :key="item">{{ item }}</div>
      </div>
    </h-scrollbar>
  </section>
</template>

<style scoped>
.scrollbar-manual-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.scrollbar-manual-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-2);
}

.scrollbar-manual-demo__scroller {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.scrollbar-manual-demo__content {
  display: grid;
  min-inline-size: 1080px;
  padding-inline: var(--h-spacing-3);
}

.scrollbar-manual-demo__content > div {
  min-block-size: 44px;
  padding: var(--h-spacing-3);
  border-bottom: 1px solid var(--h-divider-default);
  color: var(--h-text-secondary);
}
</style>
