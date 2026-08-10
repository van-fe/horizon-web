<script setup lang="ts">
import { ref } from 'vue';

const size = ref<'small' | 'medium' | 'large'>('medium');
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

    <div class="tag-row">
      <h-tag :size="size" :clickable="false">v3.8</h-tag>
      <h-tag :size="size" bold :clickable="false">重点版本</h-tag>
    </div>
  </section>
</template>

<style scoped>
.tag-row {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
