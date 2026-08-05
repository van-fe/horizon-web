<template>
  <div class="statistic-grid">
    <h-statistic title="总收入" :value="126580.5" :precision="2" prefix="¥" />
    <h-statistic title="活跃用户" :value="8426" suffix="人" />
    <h-statistic title="任务完成率" :value="98.6" :precision="1" suffix="%" />
  </div>
</template>

<style scoped>
.statistic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 720px) {
  .statistic-grid {
    grid-template-columns: 1fr;
  }
}
</style>
