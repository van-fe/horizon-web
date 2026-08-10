<template>
  <article class="typography-article">
    <h-typography :level="1">让产品信息更易读</h-typography>
    <h-typography type="secondary" block>设计系统 · 阅读约 3 分钟</h-typography>

    <h-typography :level="3">清晰的内容层级</h-typography>
    <h-typography block>
      标题帮助读者快速定位主题，正文承载主要信息，辅助文字则用于解释时间、来源或补充条件。
    </h-typography>
    <h-typography code>pnpm add @aurora/horizon-web</h-typography>

    <div class="tone-list">
      <h-typography type="success">配置已保存</h-typography>
      <h-typography type="warning">还有 2 项内容待确认</h-typography>
      <h-typography type="danger">同步失败，请稍后重试</h-typography>
    </div>
  </article>
</template>

<style scoped>
.typography-article {
  display: grid;
  max-width: 680px;
  gap: 12px;
  padding: 24px;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-default);
}

.typography-article :deep(h1),
.typography-article :deep(h3) {
  margin: 0;
}

.tone-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--h-divider-default);
}

@media (max-width: 560px) {
  .typography-article {
    padding: 18px;
  }
}
</style>
