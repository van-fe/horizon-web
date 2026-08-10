<template>
  <div class="tag-row">
    <h-tag disabled closable plain>Default branch</h-tag>
    <h-tag type="success" disabled closable plain>Signed</h-tag>
    <h-tag type="warning" disabled closable plain>Release window</h-tag>
  </div>
</template>

<style scoped>
.tag-row {
  display: flex;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
