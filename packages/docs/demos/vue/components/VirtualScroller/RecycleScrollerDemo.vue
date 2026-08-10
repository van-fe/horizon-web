<script setup lang="ts">
import { ref } from 'vue';

const rowMode = ref<'fixed' | 'variable'>('fixed');
const items = Array.from({ length: 1200 }, (_, index) => ({
  id: index + 1,
  label: `Row ${String(index + 1).padStart(4, '0')}`,
  height: index % 4 === 0 ? 80 : 56,
}));
</script>

<template>
  <section class="recycle-scroller-demo">
    <h-segmented v-model:active-key="rowMode" size="small" block aria-label="Row sizing">
      <h-segmented-item value="fixed" label="Fixed 56px" />
      <h-segmented-item value="variable" label="Data field" />
    </h-segmented>

    <div
      class="recycle-scroller-demo__viewport"
      role="region"
      aria-label="Virtualized rows with fixed or data-driven sizes"
    >
      <h-recycle-scroller
        :items="items"
        :item-size="rowMode === 'fixed' ? 56 : undefined"
        size-field="height"
        scroller-height="336px"
      >
        <template #default="{ item, index }">
          <div class="recycle-scroller-demo__row">
            <span>{{ index + 1 }}</span>
            <strong>{{ item.label }}</strong>
            <small>
              {{ rowMode === 'fixed' ? 'item-size: 56px' : `size-field: ${item.height}px` }}
            </small>
          </div>
        </template>
      </h-recycle-scroller>
    </div>
  </section>
</template>

<style scoped>
.recycle-scroller-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 720px;
}

.recycle-scroller-demo__viewport {
  min-inline-size: 0;
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.recycle-scroller-demo__row {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto;
  align-items: center;
  height: 100%;
  gap: var(--h-spacing-3);
  padding-inline: var(--h-spacing-3);
  border-bottom: 1px solid var(--h-divider-default);
}

.recycle-scroller-demo__row > span,
.recycle-scroller-demo__row > small {
  color: var(--h-text-tertiary);
}

.recycle-scroller-demo__row > strong,
.recycle-scroller-demo__row > small {
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 390px) {
  .recycle-scroller-demo__row {
    grid-template-columns: 36px minmax(0, 1fr);
  }

  .recycle-scroller-demo__row > small {
    display: none;
  }
}
</style>
