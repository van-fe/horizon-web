<template>
  <h-grid class="gap-demo" :cols="{ xs: 1, md: 2 }" :gap="16">
    <h-grid-item>
      <section class="gap-card">
        <code>gap="12"</code>
        <h-grid :cols="3" :gap="12">
          <h-grid-item v-for="index in 6" :key="index">
            <span>{{ index }}</span>
          </h-grid-item>
        </h-grid>
      </section>
    </h-grid-item>

    <h-grid-item>
      <section class="gap-card">
        <code>column-gap="24" · row-gap="8"</code>
        <h-grid :cols="3" :column-gap="24" :row-gap="8">
          <h-grid-item v-for="index in 6" :key="index">
            <span>{{ index }}</span>
          </h-grid-item>
        </h-grid>
      </section>
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
.gap-card {
  display: grid;
  height: 100%;
  gap: 18px;
  padding: 18px;
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-secondary);
}

.gap-card code {
  justify-self: start;
  padding: 3px 7px;
  border-radius: 5px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-default);
  font-size: 11px;
}

.gap-card .h-grid-item span {
  display: grid;
  place-items: center;
  min-height: 42px;
  border-radius: 7px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: 12px;
  font-weight: 600;
}
</style>
