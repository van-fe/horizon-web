<template>
  <div class="tag-row">
    <h-tag icon="eye" plain :clickable="false">Preview</h-tag>
    <h-tag icon="complete" type="success" plain :clickable="false">Passed</h-tag>
    <h-tag icon="remind" type="warning" plain :clickable="false">Expiring</h-tag>
  </div>
</template>

<style scoped>
.tag-row {
  display: flex;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
