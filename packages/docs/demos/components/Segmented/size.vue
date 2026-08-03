<script setup lang="ts">
import { ref } from 'vue';
import type { HSegmentedSize } from '@aurora/horizon-web';

const size = ref<HSegmentedSize>('medium');
const active = ref('Tasks');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="size" size="small">
        <h-segmented-item key="small" label="Small" />
        <h-segmented-item key="medium" label="Medium" />
        <h-segmented-item key="large" label="Large" />
        <h-segmented-item key="huge" label="Huge" />
      </h-segmented>
    </div>
    <h-segmented v-model:active-key="active" :size="size">
      <h-segmented-item key="Overview" label="Overview" />
      <h-segmented-item key="Tasks" label="Tasks" />
      <h-segmented-item key="Files" label="Files" />
    </h-segmented>
  </section>
</template>
