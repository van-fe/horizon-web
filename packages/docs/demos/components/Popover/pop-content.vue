<template>
  <div class="content-grid">
    <div>
      <span>使用 HPopContent</span>
      <h-popover>
        <template #reference><h-button type="normal">标准内容容器</h-button></template>
        <template #popper>
          <h-pop-content>
            <div class="popover-copy">
              <strong>项目已更新</strong>
              <p>自动获得标准内边距与背景样式。</p>
            </div>
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div>
      <span>直接渲染内容</span>
      <h-popover>
        <template #reference><h-button>自定义内容容器</h-button></template>
        <template #popper>
          <div class="custom-content">
            <strong>实时状态</strong>
            <span>12 个服务运行正常</span>
          </div>
        </template>
      </h-popover>
    </div>
  </div>
</template>

<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.content-grid > div {
  display: grid;
  justify-items: start;
  gap: 10px;
  padding: 10px 0;
}

.content-grid > div > span,
.popover-copy p,
.custom-content span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

.popover-copy {
  width: 220px;
}

.popover-copy p {
  margin: 5px 0 0;
}

.custom-content {
  display: grid;
  width: 220px;
  gap: 6px;
  padding: 18px;
  border: 1px solid var(--h-border-brand-default);
  border-radius: 10px;
  color: var(--h-text-primary);
  background: var(--h-bg-default);
  box-shadow: var(--h-shadow-down);
}

@media (max-width: 560px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
