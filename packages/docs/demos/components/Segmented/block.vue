<script setup lang="ts">
import { ref } from 'vue';

const active = ref('Review');
</script>

<template>
  <h-segmented v-model:active-key="active" block>
    <h-segmented-item key="Brief" label="Brief" />
    <h-segmented-item key="Design" label="Design" />
    <h-segmented-item key="Review" label="Review" />
    <h-segmented-item key="Ready" label="Ready" />
  </h-segmented>
</template>
