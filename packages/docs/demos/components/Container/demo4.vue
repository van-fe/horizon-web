<template>
  <h-container class="container-demo">
    <h-header class="region region--header">Header</h-header>
    <h-container>
      <h-aside class="region region--aside">Aside</h-aside>
      <h-main class="region region--main">Main</h-main>
    </h-container>
  </h-container>
</template>

<style scoped>
.container-demo {
  min-height: 220px;
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

.region--aside {
  width: 150px;
  background: var(--h-bg-weak-default);
}

.region--main {
  background: var(--h-bg-secondary);
}

@media (max-width: 560px) {
  .region--aside {
    width: 96px;
  }
}
</style>
