<script setup lang="ts"></script>

<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-button size="small" :auto-fit="true">Small</h-button>
      <h-button size="medium" :auto-fit="true">Medium</h-button>
      <h-button size="large" :auto-fit="true">Large</h-button>
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
