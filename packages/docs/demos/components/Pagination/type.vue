<template>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">Simple</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" type="simple" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">Simplest</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" type="simplest" />
    </h-col>
  </h-row>
</template>
