<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-button :plain="true" border-style="solid">Solid</h-button>
      <h-button :plain="true" border-style="dotted">Dotted</h-button>
      <h-button :plain="true" border-style="dashed">Dashed</h-button>
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
