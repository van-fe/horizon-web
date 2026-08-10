<template>
  <div class="steps-stage">
    <h-steps :current="2" progress-dot status="process">
      <h-step title="提交申请" description="09:20" />
      <h-step title="资料审核" description="09:42" />
      <h-step title="安全检查" description="处理中" />
      <h-step title="发布完成" description="等待中" />
    </h-steps>
  </div>
</template>

<style scoped>
.steps-stage {
  overflow-x: auto;
  padding-block: 12px;
}

.steps-stage :deep(.h-steps) {
  min-width: 520px;
}
</style>
