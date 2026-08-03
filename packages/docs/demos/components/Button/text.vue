<script setup lang="ts"></script>

<template>
  <h-button type="normal" text>Normal Text Button</h-button>
  <h-button text>Primary Text Button</h-button>
  <h-button type="danger" text>Danger Text Button</h-button>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
