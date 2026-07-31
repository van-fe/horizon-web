<template>
  <h-space direction="vertical" :size="16">
    <h-license-plate-input v-model="newEnergyPlate" />
    <h-license-plate-input v-model="invalidPlate" />
    <h-license-plate-input model-value="沪A12345" disabled />
    <h-license-plate-input model-value="粤B12345D" readonly />
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newEnergyPlate = ref('粤BD12345');
const invalidPlate = ref('京I12345');
</script>
