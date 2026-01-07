<script setup lang="ts">
import { IconEdit } from '@aurora/icon';
</script>

<template>
  <h-row>
    <h-col :span="24">
      <h-button size="small" :auto-fit="true">Small</h-button>
      <h-button size="medium" :auto-fit="true">Medium</h-button>
      <h-button size="large" :auto-fit="true">Large</h-button>
      <h-button :auto-fit="true" :plain="true" :icon="IconEdit" size="small" />
      <h-button :auto-fit="true" :plain="true" :icon="IconEdit" size="medium" />
      <h-button :auto-fit="true" :plain="true" :icon="IconEdit" size="large" />
    </h-col>
  </h-row>
</template>

<style scoped>
.h-button + .h-button {
  margih-left: 10px;
}
</style>
