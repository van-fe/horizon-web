<script setup lang="ts">
import { ref } from 'vue';

const size = ref<'small' | 'medium' | 'large'>('medium');
const value = ref(54);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="size" size="small">
        <h-segmented-item value="small" label="Small" />
        <h-segmented-item value="medium" label="Medium" />
        <h-segmented-item value="large" label="Large" />
      </h-segmented>
    </div>

    <h-slider v-model="value" :size="size" />
    <p class="docs-demo__status">当前值：{{ value }}</p>
  </section>
</template>
