<template>
  <n-row>
    <n-col :span="24">
      <n-button :plain="true" border-style="solid">Solid</n-button>
      <n-button :plain="true" border-style="dashed">Dashed</n-button>
    </n-col>
  </n-row>
</template>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
