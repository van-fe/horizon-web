<script setup lang="ts"></script>

<template>
  <h-row>
    <h-col :span="24">
      <h-button size="small" :auto-fit="true">Small</h-button>
      <h-button size="medium" :auto-fit="true">Medium</h-button>
      <h-button size="large" :auto-fit="true">Large</h-button>
    </h-col>
  </h-row>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
