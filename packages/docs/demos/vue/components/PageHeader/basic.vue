<template>
  <h-page-header title="Accessibility audit">
    <template #tags>
      <h-tag size="small" :clickable="false">In review</h-tag>
    </template>
    <template #content>
      <span class="page-header-meta">AUD-2048 · Owner: Mira Chen</span>
    </template>
    <template #extra>
      <h-button>Request review</h-button>
    </template>
  </h-page-header>
</template>

<style scoped>
.page-header-meta {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
