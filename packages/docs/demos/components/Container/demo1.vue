<template>
  <h-container class="container-demo">
    <h-header class="region region--header">Header</h-header>
    <h-main class="region region--main">Main</h-main>
  </h-container>
</template>

<style scoped>
.container-demo {
  min-height: 180px;
  overflow: hidden;
  border-radius: var(--h-radius-l);
}

.region {
  display: grid;
  place-items: center;
  color: var(--h-text-secondary);
}

.region--header {
  height: 52px;
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
}

.region--main {
  background: var(--h-bg-secondary);
}
</style>
