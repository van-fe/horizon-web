<template>
  <h-space wrap size="large">
    <h-badge
      v-for="item in samples"
      :key="item.label"
      :type="item.type"
      :content="item.content"
      :color="item.color"
    >
      <h-button type="normal">{{ item.label }}</h-button>
    </h-badge>
  </h-space>
</template>

<script setup lang="ts">
const samples = [
  {
    label: 'Brand',
    type: 'dot' as const,
    content: '',
    color: 'var(--h-bg-brand-default)',
  },
  {
    label: 'Warning',
    type: 'dot' as const,
    content: '',
    color: 'var(--h-bg-warning-default)',
  },
  {
    label: 'Success',
    type: 'num' as const,
    content: 3,
    color: 'var(--h-bg-success-default)',
  },
];
</script>
