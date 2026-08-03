<template>
  <div id="affix-target" class="viewport">
    <div class="track">
      <h-affix target="#affix-target" :offset="12"><h-button>Filter</h-button></h-affix>
      <div v-for="item in 10" :key="item" class="row">Item {{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
.viewport {
  height: 260px;
  overflow: auto;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
}

.track {
  display: grid;
  min-height: 640px;
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
