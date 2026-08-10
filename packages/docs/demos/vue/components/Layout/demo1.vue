<template>
  <section class="docs-demo">
    <h-grid :cols="24" :gap="12">
      <h-grid-item :span="12"><div class="track">12</div></h-grid-item>
      <h-grid-item :span="12"><div class="track">12</div></h-grid-item>
    </h-grid>

    <h-grid :cols="24" :gap="12">
      <h-grid-item :span="6"><div class="track track--soft">6</div></h-grid-item>
      <h-grid-item :span="18"><div class="track">18</div></h-grid-item>
    </h-grid>
  </section>
</template>

<style scoped>
.track {
  display: grid;
  place-items: center;
  min-height: 44px;
  border-radius: var(--h-radius-m);
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
  font-weight: 600;
}

.track--soft {
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
}
</style>
