<template>
  <n-segmented default-active-key="Daily" block>
    <n-segmented-item v-for="v in options" :key="v" :label="v" />
  </n-segmented>
</template>

<script setup lang="ts">
const options = [
  'Daily',
  'Weekly',
  'Monthly',
  'Quarterly',
  'LongTextLongTextLongTextLongTextLongText',
];
</script>

<style scoped></style>
