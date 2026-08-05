<script setup lang="ts">
const metrics = [
  {
    title: '请求成功率',
    value: 99.2,
    precision: 1,
    suffix: '%',
    trend: 'up',
    trendValue: '1.8%',
    trendType: 'success',
  },
  {
    title: '错误请求',
    value: 128,
    trend: 'up',
    trendValue: '12%',
    trendType: 'danger',
  },
  {
    title: '待处理告警',
    value: 36,
    trend: 'down',
    trendValue: '5',
    trendType: 'neutral',
  },
] as const;
</script>

<template>
  <div class="trend-grid">
    <div v-for="metric in metrics" :key="metric.title" class="trend-item">
      <h-statistic
        :title="metric.title"
        :value="metric.value"
        :precision="metric.precision"
        :suffix="metric.suffix"
        :trend="metric.trend"
        :trend-value="metric.trendValue"
        :trend-type="metric.trendType"
      />
    </div>
    <div class="trend-item">
      <h-statistic title="实时吞吐" :value="0" loading />
      <span>等待下一次采样</span>
    </div>
  </div>
</template>

<style scoped>
.trend-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.trend-item {
  min-width: 0;
}

.trend-item > span {
  display: block;
  margin-top: 10px;
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 800px) {
  .trend-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .trend-grid {
    grid-template-columns: 1fr;
  }
}
</style>
