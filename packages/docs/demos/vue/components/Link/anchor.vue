<template>
  <div class="docs-demo">
    <h-space wrap>
      <h-link anchor="anchor-overview" :underline="false" scroll-target=".anchor-scroll">
        项目概览
      </h-link>
      <h-link
        anchor="anchor-members"
        :anchor-offset="16"
        :underline="false"
        scroll-target=".anchor-scroll"
      >
        团队成员（偏移 16px）
      </h-link>
    </h-space>
    <div class="anchor-scroll">
      <section id="anchor-overview">
        <strong>项目概览</strong>
        <p>滚动区域中的第一个锚点目标。</p>
      </section>
      <div class="anchor-spacer">向下滚动</div>
      <section id="anchor-members">
        <strong>团队成员</strong>
        <p>使用 anchor-offset 为固定头部预留空间。</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.anchor-scroll {
  height: 210px;
  overflow-y: auto;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-secondary);
  scroll-behavior: smooth;
}

.anchor-scroll section {
  padding: 20px;
  border-radius: 10px;
  color: var(--h-text-primary);
  background: var(--h-bg-default);
}

.anchor-scroll p {
  margin: 6px 0 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

.anchor-spacer {
  display: grid;
  height: 190px;
  place-items: center;
  color: var(--h-text-tertiary);
  font-size: 12px;
}
</style>
