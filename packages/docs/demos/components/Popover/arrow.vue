<template>
  <div class="arrow-grid">
    <div>
      <span>带箭头</span>
      <h-popover>
        <template #reference><h-button type="normal">查看说明</h-button></template>
        <template #popper>
          <h-pop-content>
            <div class="popover-copy">
              <strong>发布窗口</strong>
              <p>建议在业务低峰期执行。</p>
            </div>
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div>
      <span>无箭头</span>
      <h-popover :arrow="false">
        <template #reference><h-button>查看说明</h-button></template>
        <template #popper>
          <h-pop-content>
            <div class="popover-copy">
              <strong>发布窗口</strong>
              <p>建议在业务低峰期执行。</p>
            </div>
          </h-pop-content>
        </template>
      </h-popover>
    </div>
  </div>
</template>

<style scoped>
.arrow-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.arrow-grid > div {
  display: grid;
  justify-items: start;
  gap: 10px;
  padding: 10px 0;
}

.arrow-grid > div > span,
.popover-copy p {
  color: var(--h-text-secondary);
  font-size: 12px;
}

.popover-copy {
  width: 220px;
}

.popover-copy p {
  margin: 5px 0 0;
  line-height: 1.6;
}

@media (max-width: 480px) {
  .arrow-grid {
    grid-template-columns: 1fr;
  }
}
</style>
