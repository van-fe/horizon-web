<template>
  <div class="tag-row">
    <h-tag :clickable="false">Default</h-tag>
    <h-tag type="info" :clickable="false">Info</h-tag>
    <h-tag type="success" :clickable="false">Success</h-tag>
    <h-tag type="warning" :clickable="false">Warning</h-tag>
    <h-tag type="error" :clickable="false">Error</h-tag>
  </div>
</template>

<style scoped>
.tag-row {
  display: flex;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
