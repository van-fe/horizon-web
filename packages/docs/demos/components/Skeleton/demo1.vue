<template>
  <section class="skeleton-basic-demo">
    <header class="skeleton-basic-demo__toolbar">
      <div>
        <span class="skeleton-basic-demo__eyebrow">DEFAULT TEMPLATE</span>
        <strong>Loading preview</strong>
      </div>
      <div class="skeleton-basic-demo__control">
        <code>animated={{ isAnimated }}</code>
        <h-switch v-model="isAnimated" label="animated" />
      </div>
    </header>

    <article class="skeleton-preview" aria-busy="true">
      <header class="skeleton-preview__header">
        <span class="skeleton-preview__mark" aria-hidden="true">H</span>
        <div>
          <strong>Horizon digest</strong>
          <span>3 updates are being prepared</span>
        </div>
        <span class="skeleton-preview__status">
          <i aria-hidden="true"></i>
          loading
        </span>
      </header>
      <div class="skeleton-preview__body">
        <h-skeleton :animated="isAnimated" />
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isAnimated = ref(true);
</script>

<style scoped>
.skeleton-basic-demo {
  display: grid;
  gap: var(--h-spacing-5);
  width: 100%;
}

.skeleton-basic-demo__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-5);
}

.skeleton-basic-demo__toolbar > div:first-child {
  display: grid;
  gap: var(--h-spacing-1);
}

.skeleton-basic-demo__toolbar strong,
.skeleton-preview__header strong {
  color: var(--h-text-primary);
  font-size: var(--h-text-base);
}

.skeleton-basic-demo__eyebrow {
  color: var(--h-text-brand-default);
  font-size: var(--h-text-sm);
  font-weight: var(--h-weight-strong);
  letter-spacing: 0.08em;
}

.skeleton-basic-demo__control {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-4);
}

.skeleton-basic-demo__control code {
  padding: var(--h-spacing-1) var(--h-spacing-3);
  border-radius: var(--h-radius-m);
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: var(--h-text-sm);
}

.skeleton-preview {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-xl);
  background: var(--h-bg-default);
  box-shadow: var(--h-shadow-basic);
}

.skeleton-preview__header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--h-spacing-4);
  padding: var(--h-spacing-4) var(--h-spacing-5);
  border-bottom: 1px solid var(--h-border-default);
  background: var(--h-bg-secondary);
}

.skeleton-preview__header > div {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-1);
}

.skeleton-preview__header span:not(.skeleton-preview__mark, .skeleton-preview__status) {
  overflow: hidden;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skeleton-preview__mark {
  display: grid;
  place-items: center;
  width: var(--h-spacing-9);
  height: var(--h-spacing-9);
  border-radius: var(--h-radius-l);
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
  font-weight: var(--h-weight-strong);
}

.skeleton-preview__status {
  display: inline-flex;
  align-items: center;
  gap: var(--h-spacing-2);
  padding: var(--h-spacing-1) var(--h-spacing-3);
  border-radius: var(--h-radius-pill);
  color: var(--h-text-secondary);
  background: var(--h-bg-default);
  font-size: var(--h-text-sm);
}

.skeleton-preview__status i {
  width: 6px;
  height: 6px;
  border-radius: var(--h-radius-circle);
  background: var(--h-bg-brand-default);
  box-shadow: 0 0 0 var(--h-spacing-1) var(--h-bg-weak-activated);
}

.skeleton-preview__body {
  min-height: 128px;
  padding: var(--h-spacing-8) var(--h-spacing-7) var(--h-spacing-7);
  box-sizing: border-box;
}

@media (max-width: 520px) {
  .skeleton-basic-demo__toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .skeleton-basic-demo__control {
    justify-content: space-between;
    width: 100%;
  }

  .skeleton-preview__header {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .skeleton-preview__status {
    grid-column: 2;
    width: fit-content;
  }

  .skeleton-preview__body {
    padding: var(--h-spacing-7) var(--h-spacing-5) var(--h-spacing-6);
  }
}
</style>
