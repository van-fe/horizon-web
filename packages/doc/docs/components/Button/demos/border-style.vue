<template>
  <h-row>
    <h-col :span="24">
      <h-button :plain="true" border-style="solid">Solid</h-button>
      <h-button :plain="true" border-style="dashed">Dashed</h-button>
    </h-col>
  </h-row>
</template>

<style scoped>
.h-button + .h-button {
  margih-left: 10px;
}
</style>
