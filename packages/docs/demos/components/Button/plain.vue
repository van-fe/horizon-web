<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-button type="normal" plain>Normal Plain Button</h-button>
      <h-button plain>Primary Plain Button</h-button>
      <h-button type="danger" plain>Danger Plain Button</h-button>
    </h-grid-item>
  </h-grid>
  <h-grid class="dark-wrapper" :gap="12">
    <h-grid-item :span="24">
      <h-button type="normal" ghost plain>Normal Ghost Button</h-button>
      <h-button ghost plain>Primary Ghost Button</h-button>
      <h-button type="danger" ghost plain>Danger Ghost Button</h-button>
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}

.dark-wrapper {
  background: rgba(69, 69, 69, 1);
  padding: 10px 0;
}
</style>
