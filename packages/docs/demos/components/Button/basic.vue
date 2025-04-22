<script setup lang="ts"></script>

<template>
  <n-row>
    <n-col :span="24">
      <n-button>Primary Button</n-button>
      <n-button type="danger">Danger Button</n-button>
    </n-col>
    <n-col :span="24">
      <n-button :round="true">Primary Button</n-button>
      <n-button :round="true" type="danger">Danger Button</n-button>
    </n-col>
  </n-row>
</template>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
