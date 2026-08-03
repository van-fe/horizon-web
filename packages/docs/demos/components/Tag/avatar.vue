<template>
  <div class="tag-row">
    <h-tag avatar="/demo-assets/avatar-indigo.svg" round plain :clickable="false">Mia Chen</h-tag>
    <h-tag round plain :clickable="false">
      <template #avatar><h-avatar src="/demo-assets/avatar-cyan.svg" :size="20" /></template>
      Ava Wang
    </h-tag>
  </div>
</template>

<style scoped>
.tag-row {
  display: flex;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
