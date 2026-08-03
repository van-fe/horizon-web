<script setup lang="ts">
import { ref } from 'vue';

const active = ref('Monthly');
</script>

<template>
  <h-segmented v-model:active-key="active">
    <h-segmented-item key="Daily" label="Daily" />
    <h-segmented-item key="Weekly" label="Weekly" />
    <h-segmented-item key="Monthly" label="Monthly" />
  </h-segmented>
</template>
