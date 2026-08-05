<template>
  <h-hover v-slot="{ hover }" disabled>
    <div class="hover-disabled-demo">
      <span>Hover tracking disabled</span>
      <small>hover={{ hover }}</small>
    </div>
  </h-hover>
</template>

<style scoped>
.hover-disabled-demo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-4);
  min-height: 72px;
  padding: var(--h-spacing-4);
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
  background: var(--h-bg-disabled);
}

.hover-disabled-demo small {
  color: var(--h-text-secondary);
}
</style>
