<template>
  <h-grid class="gap-demo" :cols="{ xs: 1, md: 2 }" :gap="16">
    <h-grid-item>
      <section class="gap-card">
        <header>
          <div>
            <strong>统一间距</strong>
            <p>行列使用相同距离</p>
          </div>
          <code>gap: 12</code>
        </header>
        <h-grid :cols="3" :gap="12">
          <h-grid-item v-for="index in 6" :key="index">
            <span>{{ index }}</span>
          </h-grid-item>
        </h-grid>
      </section>
    </h-grid-item>

    <h-grid-item>
      <section class="gap-card">
        <header>
          <div>
            <strong>独立控制</strong>
            <p>更宽的列间距，更紧凑的行间距</p>
          </div>
          <code>24 / 8</code>
        </header>
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
  height: 100%;
  padding: 18px;
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-secondary);
}

.gap-card header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.gap-card strong {
  color: var(--h-text-primary);
  font-size: 14px;
}

.gap-card p {
  margin: 4px 0 0;
  color: var(--h-text-secondary);
  font-size: 12px;
}

.gap-card code {
  flex: none;
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
