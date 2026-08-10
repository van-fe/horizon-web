<template>
  <section class="horizontal-scroller-demo">
    <div
      class="horizontal-scroller-demo__viewport"
      role="region"
      aria-label="Horizontal virtual list"
    >
      <h-virtual-scroller
        :items="items"
        :min-item-size="160"
        direction="horizontal"
        scroller-height="180px"
      >
        <template #default="{ item, active, index }">
          <h-virtual-scroller-item
            :item="item"
            :active="active"
            :index="index"
            :size-dependencies="[item.label, item.width]"
            :style="{ width: `${item.width}px` }"
            class="horizontal-scroller-demo__item"
          >
            <small>Item {{ index + 1 }}</small>
            <strong>{{ item.label }}</strong>
            <code>{{ item.width }}px</code>
          </h-virtual-scroller-item>
        </template>
      </h-virtual-scroller>
    </div>
  </section>
</template>

<script setup lang="ts">
const widths = [160, 200, 240];
const items = Array.from({ length: 1200 }, (_, index) => ({
  id: index + 1,
  label: `Horizontal item ${String(index + 1).padStart(4, '0')}`,
  width: widths[index % widths.length],
}));
</script>

<style scoped>
.horizontal-scroller-demo {
  max-inline-size: 100%;
}

.horizontal-scroller-demo__viewport {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.horizontal-scroller-demo__item {
  display: grid;
  height: 100%;
  align-content: center;
  gap: var(--h-spacing-2);
  padding: var(--h-spacing-4);
  border-right: 1px solid var(--h-divider-default);
}

.horizontal-scroller-demo__item small,
.horizontal-scroller-demo__item code {
  color: var(--h-text-secondary);
}
</style>
