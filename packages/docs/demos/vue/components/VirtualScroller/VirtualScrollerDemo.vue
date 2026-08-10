<template>
  <section class="virtual-scroller-demo">
    <div
      class="virtual-scroller-demo__viewport"
      role="region"
      aria-label="Dynamically measured virtual list"
    >
      <h-virtual-scroller :items="items" :min-item-size="56" scroller-height="360px">
        <template #default="{ item, active, index }">
          <h-virtual-scroller-item
            :item="item"
            :active="active"
            :index="index"
            :size-dependencies="[item.message]"
            class="virtual-scroller-demo__item"
          >
            <span>{{ index + 1 }}</span>
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.message }}</p>
            </div>
          </h-virtual-scroller-item>
        </template>
      </h-virtual-scroller>
    </div>
  </section>
</template>

<script setup lang="ts">
const messages = [
  'Short content.',
  'A medium-length item wraps naturally when the documentation viewport becomes narrow.',
  'This longer item demonstrates dynamic measurement. VirtualScrollerItem reports its rendered height and size-dependencies requests a new measurement whenever this message changes.',
];
const items = Array.from({ length: 1600 }, (_, index) => ({
  id: index + 1,
  title: `Dynamic row ${String(index + 1).padStart(4, '0')}`,
  message: messages[index % messages.length],
}));
</script>

<style scoped>
.virtual-scroller-demo {
  max-inline-size: 720px;
}

.virtual-scroller-demo__viewport {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.virtual-scroller-demo__item {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: start;
  gap: var(--h-spacing-3);
  padding: var(--h-spacing-3) var(--h-spacing-4);
  border-bottom: 1px solid var(--h-divider-default);
}

.virtual-scroller-demo__item > span,
.virtual-scroller-demo__item p {
  color: var(--h-text-secondary);
}

.virtual-scroller-demo__item p {
  margin: 0;
  overflow-wrap: anywhere;
  line-height: 1.5;
}

@media (max-width: 390px) {
  .virtual-scroller-demo__item {
    grid-template-columns: 36px minmax(0, 1fr);
  }
}
</style>
