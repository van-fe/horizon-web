<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
  <h-button @click="visible = !visible">Click</h-button>
  <h-dialog v-model:visible="visible" size="small">
    <div>Hello World</div>
  </h-dialog>
</template>
