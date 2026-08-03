<template>
  <div class="popover-stage">
    <h-popover popper-class="popover-accent">
      <template #reference><h-button type="normal">品牌提示</h-button></template>
      <template #popper>
        <h-pop-content>
          <div class="popover-copy">
            <strong>设计变量已同步</strong>
            <p>此浮层使用独立边框和阴影。</p>
          </div>
        </h-pop-content>
      </template>
    </h-popover>
  </div>
</template>

<style scoped>
.popover-stage {
  display: flex;
  justify-content: center;
  padding-block: 24px;
}

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
</style>

<style>
.popover-accent {
  border: 1px solid var(--h-border-brand-default) !important;
  box-shadow: var(--h-shadow-down) !important;
}
</style>
