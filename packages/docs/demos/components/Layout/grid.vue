<template>
  <h-grid
    class="feature-grid"
    :cols="{ xs: 1, sm: 2, md: 12 }"
    :column-gap="{ xs: 12, md: 16 }"
    :row-gap="{ xs: 12, md: 16 }"
  >
    <h-grid-item :span="{ xs: 1, sm: 2, md: 7 }">
      <div class="grid-cell grid-cell--strong">7 columns</div>
    </h-grid-item>

    <h-grid-item :span="{ xs: 1, md: 5 }">
      <div class="grid-cell">5 columns</div>
    </h-grid-item>

    <h-grid-item :span="{ xs: 1, md: 6 }">
      <div class="grid-cell">6 columns</div>
    </h-grid-item>

    <h-grid-item :span="{ xs: 1, md: 6 }">
      <div class="grid-cell grid-cell--soft">6 columns</div>
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
.grid-cell {
  display: grid;
  place-items: center;
  min-height: 64px;
  border-radius: var(--h-radius-m);
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: var(--h-text-sm);
  font-weight: var(--h-weight-strong);
}

.grid-cell--strong {
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
}

.grid-cell--soft {
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
}
</style>
