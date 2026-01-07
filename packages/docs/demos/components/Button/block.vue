<script setup lang="ts"></script>

<template>
  <div class="block-buttons">
    <h-button :block="true">Primary Button</h-button>
    <h-button :block="true" type="danger">Danger Button</h-button>
    <h-button :block="true" :plain="true">Primary Plain Button</h-button>
    <h-button :block="true" :plain="true" type="danger">Danger Plain Button</h-button>
  </div>
</template>

<style scoped>
.block-buttons {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 10px;
}
</style>
