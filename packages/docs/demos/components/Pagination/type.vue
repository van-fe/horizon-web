<template>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">Simple</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" type="simple" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">Simplest</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" type="simplest" />
    </h-grid-item>
  </h-grid>
</template>
