<template>
  <div class="docs-demo">
    <div class="steps-stage">
      <h-steps :current="1" size="small" status="process">
        <h-step title="上传" />
        <h-step title="解析" />
        <h-step title="导入" />
      </h-steps>
    </div>
  </div>
</template>

<style scoped>
.steps-stage {
  overflow-x: auto;
  padding-block: 12px;
}

.steps-stage :deep(.h-steps) {
  min-width: 360px;
}
</style>
