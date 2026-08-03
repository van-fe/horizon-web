<template>
  <div class="docs-demo">
    <h-space wrap size="large">
      <h-tooltip content="2 位审批人">
        <h-button type="normal">短内容</h-button>
      </h-tooltip>
      <h-tooltip>
        <h-button type="normal">长内容</h-button>
        <template #content>
          <span class="tooltip-width-demo__content">
            本次发布包含权限模型调整，灰度期间请关注登录成功率与审计日志写入延迟。
          </span>
        </template>
      </h-tooltip>
    </h-space>
    <h-tooltip overflow content="Analytics Pipeline / Production / Frankfurt / Primary cluster">
      <span class="tooltip-width-demo__ellipsis">
        Analytics Pipeline / Production / Frankfurt / Primary cluster
      </span>
    </h-tooltip>
  </div>
</template>

<style scoped>
.tooltip-width-demo__content {
  display: block;
  width: min(240px, 70vw);
}

.tooltip-width-demo__ellipsis {
  display: block;
  max-width: min(280px, 75vw);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
