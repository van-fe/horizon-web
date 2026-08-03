<template>
  <h-space wrap size="large">
    <h-badge
      v-for="item in samples"
      :key="item.label"
      type="num"
      :content="item.count"
      :num-max="99"
    >
      <h-button type="normal">{{ item.label }}</h-button>
    </h-badge>
  </h-space>
</template>

<script setup lang="ts">
const samples = [
  { label: 'Zero', count: 0 },
  { label: 'Eight', count: 8 },
  { label: 'Maximum', count: 10000 },
];
</script>
