<script setup lang="ts"></script>

<template>
  <div class="block-buttons">
    <n-button :block="true">Primary Button</n-button>
    <n-button :block="true" type="danger">Danger Button</n-button>
    <n-button :block="true" :plain="true">Primary Plain Button</n-button>
    <n-button :block="true" :plain="true" type="danger">Danger Plain Button</n-button>
  </div>
</template>

<style scoped>
.block-buttons {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 10px;
}
</style>
