<template>
  <div class="vertical-stage">
    <h-steps direction="vertical" :model-value="1">
      <h-step title="订单创建" description="今天 09:20" />
      <h-step title="仓库处理" description="正在拣货" />
      <h-step title="等待配送" description="预计明天" />
    </h-steps>
  </div>
</template>

<style scoped>
.vertical-stage {
  min-height: 300px;
  padding-block: 12px;
}
</style>
