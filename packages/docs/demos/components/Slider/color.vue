<script setup lang="ts">
import { ref } from 'vue';

const color = ref('var(--h-text-brand-default)');
const value = ref(68);
const colors = [
  { key: 'var(--h-text-brand-default)', label: 'Brand' },
  { key: 'var(--h-text-success-default)', label: 'Success' },
  { key: 'var(--h-text-warning-default)', label: 'Warning' },
  { key: 'var(--h-text-error-default)', label: 'Error' },
];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="color" size="small">
        <h-segmented-item v-for="item in colors" :key="item.key" :label="item.label" />
      </h-segmented>
    </div>
    <h-slider v-model="value" :color="color" />
  </section>
</template>
