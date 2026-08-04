<script setup lang="ts">
import { ref } from 'vue';

const active = ref('Monthly');
</script>

<template>
  <h-segmented v-model:active-key="active">
    <h-segmented-item value="Daily" label="Daily" />
    <h-segmented-item value="Weekly" label="Weekly" />
    <h-segmented-item value="Monthly" label="Monthly" />
  </h-segmented>
</template>
