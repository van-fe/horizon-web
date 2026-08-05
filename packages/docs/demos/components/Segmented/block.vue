<script setup lang="ts">
import { ref } from 'vue';

const active = ref('Review');
</script>

<template>
  <h-segmented v-model:active-key="active" block>
    <h-segmented-item value="Brief" label="Brief" />
    <h-segmented-item value="Design" label="Design" />
    <h-segmented-item value="Review" label="Review" />
    <h-segmented-item value="Ready" label="Ready" />
  </h-segmented>
</template>
