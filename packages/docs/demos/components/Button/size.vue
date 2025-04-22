<script setup lang="ts"></script>

<template>
  <n-row>
    <n-col :span="24">
      <n-button size="small" :auto-fit="true">Small</n-button>
      <n-button size="medium" :auto-fit="true">Medium</n-button>
      <n-button size="large" :auto-fit="true">Large</n-button>
    </n-col>
  </n-row>
</template>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
