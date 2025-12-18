<template>
  <n-row>
    <n-col :span="24">
      <n-button type="normal" plain>Normal Plain Button</n-button>
      <n-button plain>Primary Plain Button</n-button>
      <n-button type="danger" plain>Danger Plain Button</n-button>
    </n-col>
  </n-row>
  <n-row class="dark-wrapper">
    <n-col :span="24">
      <n-button type="normal" ghost plain>Normal Ghost Button</n-button>
      <n-button ghost plain>Primary Ghost Button</n-button>
      <n-button type="danger" ghost plain>Danger Ghost Button</n-button>
    </n-col>
  </n-row>
</template>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}

.dark-wrapper {
  background: rgba(69, 69, 69, 1);
  padding: 10px 0;
}
</style>
