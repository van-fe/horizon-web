<template>
  <h-row>
    <h-col :span="24">
      <h-button type="normal" plain>Normal Plain Button</h-button>
      <h-button plain>Primary Plain Button</h-button>
      <h-button type="danger" plain>Danger Plain Button</h-button>
    </h-col>
  </h-row>
  <h-row class="dark-wrapper">
    <h-col :span="24">
      <h-button type="normal" ghost plain>Normal Ghost Button</h-button>
      <h-button ghost plain>Primary Ghost Button</h-button>
      <h-button type="danger" ghost plain>Danger Ghost Button</h-button>
    </h-col>
  </h-row>
</template>

<style scoped>
.h-button + .h-button {
  margih-left: 10px;
}

.dark-wrapper {
  background: rgba(69, 69, 69, 1);
  padding: 10px 0;
}
</style>
