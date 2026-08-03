<template>
  <h-space direction="vertical" block>
    <h-segmented
      v-for="s in ['mini', 'small', 'medium', 'large']"
      :key="s"
      :size="s"
      default-active-key="Daily"
    >
      <h-segmented-item v-for="v in options" :key="v" :label="v" />
    </h-segmented>
  </h-space>
</template>

<script setup lang="ts">
const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
</script>

<style scoped></style>
