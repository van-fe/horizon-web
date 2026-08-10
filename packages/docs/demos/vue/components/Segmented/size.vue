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
        <h-segmented-item value="small" label="Small" />
        <h-segmented-item value="medium" label="Medium" />
        <h-segmented-item value="large" label="Large" />
        <h-segmented-item value="huge" label="Huge" />
      </h-segmented>
    </div>
    <h-segmented v-model:active-key="active" :size="size">
      <h-segmented-item value="Overview" label="Overview" />
      <h-segmented-item value="Tasks" label="Tasks" />
      <h-segmented-item value="Files" label="Files" />
    </h-segmented>
  </section>
</template>
