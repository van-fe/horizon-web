<template>
  <h-hover v-slot="{ hover }">
    <div class="hover-target" :class="{ 'is-hovered': hover }">
      <span>Accessibility audit</span>
      <h-button v-if="hover" size="small" type="danger" plain>Remove</h-button>
      <small v-else>Hover for action</small>
    </div>
  </h-hover>
</template>

<style scoped>
.hover-target {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-4);
  min-height: 72px;
  padding: var(--h-spacing-4);
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
  background: var(--h-bg-default);
  transition: border-color 0.2s ease;
}

.hover-target.is-hovered {
  border-color: var(--h-border-brand-default);
}

.hover-target small {
  color: var(--h-text-secondary);
}

@media (prefers-reduced-motion: reduce) {
  .hover-target {
    transition: none;
  }
}
</style>
