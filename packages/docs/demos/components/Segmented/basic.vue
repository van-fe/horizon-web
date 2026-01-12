<template>
  <h-segmented default-active-key="Monthly">
    <h-segmented-item v-for="v in options" :key="v" :label="v" />
  </h-segmented>
</template>

<script setup lang="ts">
const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
</script>

<style scoped></style>
