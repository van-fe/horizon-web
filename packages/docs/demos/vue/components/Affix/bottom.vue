<template>
  <div id="affix-bottom" class="viewport">
    <div class="track">
      <div v-for="item in 8" :key="item" class="row">Checklist item {{ item }}</div>
      <h-affix position="bottom" target="#affix-bottom" :offset="16">
        <h-button>Submit review</h-button>
      </h-affix>
    </div>
  </div>
</template>

<style scoped>
.viewport {
  height: 280px;
  overflow: auto;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
}

.track {
  display: grid;
  min-height: 680px;
  align-content: start;
  gap: var(--h-spacing-3);
  padding: var(--h-spacing-4);
}

.row {
  border-radius: var(--h-radius-m);
  padding: var(--h-spacing-3);
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
}
</style>
