<template>
  <n-space direction="vertical" block>
    <n-segmented
      v-for="s in ['mini', 'small', 'medium', 'large']"
      :key="s"
      :size="s"
      default-active-key="Daily"
    >
      <n-segmented-item v-for="v in options" :key="v" :label="v" />
    </n-segmented>
  </n-space>
</template>

<script setup lang="ts">
const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
</script>

<style scoped></style>
