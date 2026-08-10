<template>
  <h-container class="container-demo">
    <h-header class="region region--header">Header</h-header>
    <h-main class="region region--main">Main</h-main>
    <h-footer class="region region--footer">Footer</h-footer>
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
  height: 48px;
  place-items: center;
  color: var(--h-text-secondary);
}

.region--header {
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
}

.region--main {
  height: auto;
  background: var(--h-bg-secondary);
}

.region--footer {
  background: var(--h-bg-weak-default);
}
</style>
