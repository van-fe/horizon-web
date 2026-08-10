<template>
  <section class="docs-demo">
    <div class="divider-types">
      <div>
        <code>default</code>
        <h-divider />
      </div>
      <div>
        <code>strong</code>
        <h-divider type="strong" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.divider-types {
  display: grid;
  gap: var(--h-spacing-5);
}

.divider-types code {
  color: var(--h-text-secondary);
}
</style>
