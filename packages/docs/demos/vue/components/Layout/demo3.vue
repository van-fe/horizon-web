<template>
  <h-grid class="alignment-demo" :cols="{ xs: 1, sm: 3 }" :gap="12">
    <h-grid-item>
      <section class="alignment-card">
        <code>align="start"</code>
        <h-grid class="alignment-stage" :cols="1" align="start" justify="center">
          <h-grid-item><span>Item</span></h-grid-item>
        </h-grid>
      </section>
    </h-grid-item>

    <h-grid-item>
      <section class="alignment-card">
        <code>align="center"</code>
        <h-grid class="alignment-stage" :cols="1" align="center" justify="center">
          <h-grid-item><span>Item</span></h-grid-item>
        </h-grid>
      </section>
    </h-grid-item>

    <h-grid-item>
      <section class="alignment-card">
        <code>align="end"</code>
        <h-grid class="alignment-stage" :cols="1" align="end" justify="center">
          <h-grid-item><span>Item</span></h-grid-item>
        </h-grid>
      </section>
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
.alignment-card {
  display: grid;
  gap: 12px;
  padding-top: 12px;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-default);
}

.alignment-card code {
  padding-inline: 14px;
  color: var(--h-text-secondary);
  font-size: 11px;
}

.alignment-stage {
  height: 132px;
  background:
    linear-gradient(var(--h-border-default) 1px, transparent 1px),
    linear-gradient(90deg, var(--h-border-default) 1px, transparent 1px);
  background-size: 16px 16px;
}

.alignment-stage span {
  display: inline-grid;
  place-items: center;
  width: 64px;
  height: 36px;
  border-radius: 7px;
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
  font-size: 12px;
  font-weight: 600;
}
</style>
