<template>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">Simple</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" type="simple" />
    </n-col>
  </n-row>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">Simplest</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" type="simplest" />
    </n-col>
  </n-row>
</template>
