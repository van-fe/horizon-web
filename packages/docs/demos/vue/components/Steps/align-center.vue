<template>
  <div class="steps-scroll">
    <h-steps :current="1" label-placement="vertical">
      <h-step title="创建订单" description="已完成" />
      <h-step title="确认支付" description="进行中" />
      <h-step title="等待发货" description="未开始" />
      <h-step title="完成" description="未开始" />
    </h-steps>
  </div>
</template>

<style scoped>
.steps-scroll {
  overflow-x: auto;
  padding-block: 12px;
}

.steps-scroll :deep(.h-steps) {
  min-width: 520px;
}
</style>
