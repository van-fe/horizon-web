<template>
  <div class="hover-delay-demo">
    <h-hover v-slot="{ hover }" :hover-show-delay="600">
      <div class="hover-target">
        <span>Delayed show</span>
        <h-button v-if="hover" size="small">Open</h-button>
        <small v-else>Waiting</small>
      </div>
    </h-hover>

    <h-hover v-slot="{ hover }" :hover-hide-delay="600">
      <div class="hover-target">
        <span>Delayed hide</span>
        <h-button v-if="hover" size="small">Open</h-button>
        <small v-else>Hidden</small>
      </div>
    </h-hover>
  </div>
</template>

<style scoped>
.hover-delay-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-3);
}

.hover-target {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-3);
  min-height: 72px;
  padding: var(--h-spacing-4);
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
  background: var(--h-bg-secondary);
}

.hover-target small {
  color: var(--h-text-secondary);
}

@media (max-width: 480px) {
  .hover-delay-demo {
    grid-template-columns: 1fr;
  }
}
</style>
