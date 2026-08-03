<template>
  <h-space size="large">
    <h-statistic
      title="成功率"
      :value="99.2"
      :precision="1"
      suffix="%"
      trend="up"
      trend-value="1.8%"
      trend-type="success"
    />
    <h-statistic title="错误请求" :value="128" trend="up" trend-value="12%" trend-type="danger" />
    <h-statistic title="待处理" :value="36" trend="down" trend-value="5" trend-type="neutral" />
    <h-statistic title="正在刷新" :value="0" loading />
  </h-space>
</template>
