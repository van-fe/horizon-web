<template>
  <div class="state-grid">
    <section>
      <span>禁用</span>
      <h-switch label="开启且禁用" :model-value="true" disabled />
      <h-switch label="关闭且禁用" :model-value="false" disabled />
    </section>
    <section>
      <span>只读</span>
      <h-switch label="开启且只读" readonly :model-value="true" />
      <h-switch label="关闭且只读" readonly :model-value="false" />
    </section>
  </div>
</template>

<style scoped>
.state-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.state-grid section {
  display: grid;
  justify-items: start;
  gap: 14px;
  padding: 10px 0;
}

.state-grid section > span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 480px) {
  .state-grid {
    grid-template-columns: 1fr;
  }
}
</style>
