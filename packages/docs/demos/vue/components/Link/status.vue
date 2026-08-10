<template>
  <div class="status-grid">
    <div>
      <span>默认</span>
      <h-link href="#link-new">查看未读更新</h-link>
    </div>
    <div>
      <span>已访问</span>
      <h-link href="#">返回当前章节</h-link>
    </div>
    <div>
      <span>禁用</span>
      <h-link disabled>权限设置</h-link>
    </div>
  </div>
</template>

<style scoped>
.status-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.status-grid > div {
  display: grid;
  justify-items: start;
  gap: 10px;
  padding: 16px;
  border-radius: 10px;
  background: var(--h-bg-secondary);
}

.status-grid span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 560px) {
  .status-grid {
    grid-template-columns: 1fr;
  }
}
</style>
