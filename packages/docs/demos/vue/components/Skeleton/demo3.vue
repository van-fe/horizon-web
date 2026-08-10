<template>
  <section class="skeleton-shapes-demo">
    <div
      v-for="item in shapes"
      :key="item.name"
      class="shape-item"
      :class="`shape-item--${item.name}`"
    >
      <span>{{ item.name }}</span>
      <h-skeleton-item :shape="item.name" />
    </div>
  </section>
</template>

<script lang="ts" setup>
const shapes = [
  { name: 'avatar' },
  { name: 'text' },
  { name: 'operate' },
  { name: 'image' },
  { name: 'picture' },
] as const;
</script>

<style scoped>
.skeleton-shapes-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
  width: 100%;
}

.shape-item {
  display: grid;
  align-items: center;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: var(--h-spacing-3);
}

.shape-item > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
  text-transform: capitalize;
}

.shape-item--picture {
  grid-column: 1 / -1;
}

@media (max-width: 390px) {
  .skeleton-shapes-demo {
    grid-template-columns: 1fr;
  }

  .shape-item--picture {
    grid-column: auto;
  }
}
</style>
