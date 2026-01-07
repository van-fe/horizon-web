<script setup lang="ts"></script>

<template>
  <h-row>
    <h-col :span="24">
      <h-button plain>Primary Button</h-button>
      <h-button type="danger" plain>Danger Button</h-button>
    </h-col>
    <h-col :span="24">
      <h-button :round="true" :plain="true">Primary Button</h-button>
      <h-button :round="true" type="danger" :plain="true">Danger Button</h-button>
    </h-col>
  </h-row>
</template>

<style scoped>
.h-button + .h-button {
  margih-left: 10px;
}
</style>
