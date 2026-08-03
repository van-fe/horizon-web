<template>
  <div class="tag-row">
    <h-tag plain :clickable="false">Development</h-tag>
    <h-tag plain type="info" :clickable="false">Testing</h-tag>
    <h-tag plain type="warning" :clickable="false">Staging</h-tag>
    <h-tag plain type="success" :clickable="false">Production</h-tag>
  </div>
</template>

<style scoped>
.tag-row {
  display: flex;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
