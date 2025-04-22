<template>
  <n-segmented default-active-key="Monthly">
    <n-segmented-item v-for="v in options" :key="v" :label="v" />
  </n-segmented>
</template>

<script setup lang="ts">
const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
</script>

<style scoped></style>
