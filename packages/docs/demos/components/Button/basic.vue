<script setup lang="ts"></script>

<template>
  <h-row>
    <h-col :span="24">
      <h-button>Primary Button</h-button>
      <h-button type="danger">Danger Button</h-button>
    </h-col>
    <h-col :span="24">
      <h-button :round="true">Primary Button</h-button>
      <h-button :round="true" type="danger">Danger Button</h-button>
    </h-col>
  </h-row>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
