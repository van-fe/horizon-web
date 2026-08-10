<template>
  <h-container class="container-demo">
    <h-aside class="region region--aside">Aside</h-aside>
    <h-container>
      <h-header class="region region--header">Header</h-header>
      <h-main class="region region--main">Main</h-main>
      <h-footer class="region region--footer">Footer</h-footer>
    </h-container>
  </h-container>
</template>

<style scoped>
.container-demo {
  min-height: 240px;
  overflow: hidden;
  border-radius: var(--h-radius-l);
}

.region {
  display: grid;
  place-items: center;
  color: var(--h-text-secondary);
}

.region--aside {
  width: 150px;
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
}

.region--header,
.region--footer {
  height: 48px;
  background: var(--h-bg-weak-default);
}

.region--main {
  background: var(--h-bg-secondary);
}

@media (max-width: 560px) {
  .region--aside {
    width: 88px;
  }
}
</style>
