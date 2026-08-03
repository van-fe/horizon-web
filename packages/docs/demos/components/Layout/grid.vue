<template>
  <h-grid
    class="feature-grid"
    :cols="{ xs: 1, sm: 2, md: 12 }"
    :column-gap="{ xs: 12, md: 16 }"
    :row-gap="{ xs: 12, md: 16 }"
  >
    <h-grid-item :span="{ xs: 1, sm: 2, md: 7 }">
      <article class="feature-card feature-card--hero">
        <span class="feature-card__eyebrow">CSS GRID</span>
        <strong>更直观的二维布局</strong>
        <p>轨道、跨度和间距都由浏览器原生 Grid 计算。</p>
      </article>
    </h-grid-item>

    <h-grid-item :span="{ xs: 1, md: 5 }">
      <article class="feature-card">
        <span class="feature-card__number">24</span>
        <strong>默认轨道</strong>
        <p>保持熟悉的 24 列栅格语义。</p>
      </article>
    </h-grid-item>

    <h-grid-item :span="{ xs: 1, md: 6 }">
      <article class="feature-card">
        <span class="feature-card__number">6</span>
        <strong>响应式断点</strong>
        <p>从 xs 到 xxl 按需调整布局。</p>
      </article>
    </h-grid-item>

    <h-grid-item :span="{ xs: 1, md: 6 }">
      <article class="feature-card">
        <span class="feature-card__number">1</span>
        <strong>原生 gap</strong>
        <p>告别负边距和额外列内边距。</p>
      </article>
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
.feature-card {
  display: flex;
  flex-direction: column;
  min-height: 132px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-secondary);
}

.feature-card--hero {
  border-color: var(--h-border-brand-default);
  background: linear-gradient(135deg, rgb(0 188 188 / 14%), transparent 64%), var(--h-bg-default);
}

.feature-card__eyebrow {
  width: fit-content;
  margin-bottom: 20px;
  padding: 3px 8px;
  border-radius: 999px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.feature-card__number {
  margin-bottom: 16px;
  color: var(--h-text-brand-default);
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.feature-card strong {
  color: var(--h-text-primary);
  font-size: 16px;
}

.feature-card p {
  margin: 6px 0 0;
  color: var(--h-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}
</style>
