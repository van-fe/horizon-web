<template>
  <h-container class="container-demo">
    <h-aside class="region region--aside">Aside</h-aside>
    <h-main class="region region--main">Main</h-main>
  </h-container>
</template>

<style scoped>
.container-demo {
  min-height: 200px;
  overflow: hidden;
  border-radius: var(--h-radius-l);
}

.region {
  display: grid;
  place-items: center;
  color: var(--h-text-secondary);
}

.region--aside {
  width: 160px;
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
}

.region--main {
  background: var(--h-bg-secondary);
}

@media (max-width: 560px) {
  .container-demo {
    flex-direction: column;
  }

  .region--aside {
    width: 100%;
    height: 52px;
  }
}
</style>
