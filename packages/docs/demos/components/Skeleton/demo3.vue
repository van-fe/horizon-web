<template>
  <section class="skeleton-shapes-demo">
    <header class="skeleton-shapes-demo__header">
      <div>
        <span>SKELETON ITEM</span>
        <strong>Five building blocks</strong>
      </div>
      <code>shape</code>
    </header>

    <h-grid :cols="{ xs: 1, sm: 2 }" :gap="12">
      <h-grid-item
        v-for="item in shapes"
        :key="item.name"
        :span="item.name === 'picture' ? { xs: 1, sm: 2 } : undefined"
      >
        <article class="shape-card" :class="`shape-card--${item.name}`">
          <header>
            <strong>{{ item.name }}</strong>
            <code>shape="{{ item.name }}"</code>
          </header>
          <div class="shape-card__stage">
            <h-skeleton-item :shape="item.name" />
          </div>
          <footer>{{ item.size }}</footer>
        </article>
      </h-grid-item>
    </h-grid>
  </section>
</template>

<script lang="ts" setup>
const shapes = [
  { name: 'avatar', size: '40 × 40 px' },
  { name: 'text', size: 'fluid × 24 px' },
  { name: 'operate', size: '120 × 40 px' },
  { name: 'image', size: '40 × 40 px' },
  { name: 'picture', size: '160 × 160 px' },
] as const;
</script>

<style scoped>
.skeleton-shapes-demo {
  display: grid;
  gap: var(--h-spacing-5);
  width: 100%;
}

.skeleton-shapes-demo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-5);
}

.skeleton-shapes-demo__header > div {
  display: grid;
  gap: var(--h-spacing-1);
}

.skeleton-shapes-demo__header span {
  color: var(--h-text-brand-default);
  font-size: var(--h-text-sm);
  font-weight: var(--h-weight-strong);
  letter-spacing: 0.08em;
}

.skeleton-shapes-demo__header strong {
  color: var(--h-text-primary);
  font-size: var(--h-text-base);
}

.skeleton-shapes-demo__header code {
  padding: var(--h-spacing-1) var(--h-spacing-3);
  border-radius: var(--h-radius-m);
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: var(--h-text-sm);
}

.shape-card {
  overflow: hidden;
  height: 100%;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-xl);
  background: var(--h-bg-default);
}

.shape-card > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-3);
  padding: var(--h-spacing-4) var(--h-spacing-5);
  border-bottom: 1px solid var(--h-border-default);
  background: var(--h-bg-secondary);
}

.shape-card > header strong {
  color: var(--h-text-primary);
  font-size: var(--h-text-base);
}

.shape-card > header code,
.shape-card > footer {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.shape-card__stage {
  display: grid;
  place-items: center;
  min-height: 112px;
  padding: var(--h-spacing-5);
  box-sizing: border-box;
}

.shape-card--text .shape-card__stage {
  display: block;
  padding-top: var(--h-spacing-9);
}

.shape-card--picture .shape-card__stage {
  min-height: 196px;
}

.shape-card > footer {
  padding: 0 var(--h-spacing-5) var(--h-spacing-4);
  text-align: center;
}
</style>
