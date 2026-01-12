<template>
  <h-segmented default-active-key="Daily" block>
    <h-segmented-item v-for="v in options" :key="v" :label="v" />
  </h-segmented>
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
