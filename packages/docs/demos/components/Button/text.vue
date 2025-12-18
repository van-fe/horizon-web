<script setup lang="ts"></script>

<template>
  <n-button type="normal" text>Normal Text Button</n-button>
  <n-button text>Primary Text Button</n-button>
  <n-button type="danger" text>Danger Text Button</n-button>
</template>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
