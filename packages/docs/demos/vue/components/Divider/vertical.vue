<template>
  <section class="docs-demo">
    <div class="action-bar" aria-label="Document actions">
      <h-button text type="normal">Duplicate</h-button>
      <h-divider direction="vertical" />
      <h-button text type="normal">Rename</h-button>
      <h-divider direction="vertical" />
      <h-button text type="danger">Archive</h-button>
    </div>
  </section>
</template>

<style scoped>
.action-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-2);
}
</style>
