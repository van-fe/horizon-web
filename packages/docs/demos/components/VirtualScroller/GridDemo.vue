<template>
  <section class="grid-scroller-demo">
    <h-segmented v-model:active-key="gridItems" size="small" block aria-label="Grid columns">
      <h-segmented-item :value="2" label="2 columns" />
      <h-segmented-item :value="3" label="3 columns" />
      <h-segmented-item :value="4" label="4 columns" />
    </h-segmented>

    <div class="grid-scroller-demo__viewport" role="region" aria-label="Virtualized grid">
      <h-recycle-scroller
        :items="items"
        :item-size="96"
        :grid-items="gridItems"
        scroller-height="320px"
      >
        <template #default="{ item, index }">
          <div class="grid-scroller-demo__item">
            <strong>Item {{ index + 1 }}</strong>
            <small>{{ item.label }}</small>
          </div>
        </template>
      </h-recycle-scroller>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const gridItems = ref(3);
const items = Array.from({ length: 1200 }, (_, index) => ({
  id: index + 1,
  label: `Grid cell ${String(index + 1).padStart(4, '0')}`,
}));
</script>

<style scoped>
.grid-scroller-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 720px;
}

.grid-scroller-demo__viewport {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.grid-scroller-demo__item {
  display: grid;
  height: 100%;
  align-content: center;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
  padding: var(--h-spacing-3);
  border-right: 1px solid var(--h-divider-default);
  border-bottom: 1px solid var(--h-divider-default);
}

.grid-scroller-demo__item strong,
.grid-scroller-demo__item small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.grid-scroller-demo__item small {
  color: var(--h-text-secondary);
}
</style>
