<template>
  <h-grid :cols="{ xs: 1, md: 3 }" :gap="16">
    <h-grid-item>
      <h-card>
        <h-statistic title="总收入" :value="126580.5" :precision="2" prefix="¥" />
      </h-card>
    </h-grid-item>
    <h-grid-item>
      <h-card>
        <h-statistic title="活跃用户" :value="8426" suffix="人" />
      </h-card>
    </h-grid-item>
    <h-grid-item>
      <h-card>
        <h-statistic title="完成率" :value="98.6" :precision="1" suffix="%" />
      </h-card>
    </h-grid-item>
  </h-grid>
</template>
