<script setup lang="ts">
import { ref } from 'vue';

const plain = ref(false);
const disabled = ref(false);
const labels = [
  { label: 'Core', color: 'brand' },
  { label: 'Infrastructure', color: 'indigo' },
  { label: 'Experience', color: 'purple' },
  { label: 'Growth', color: 'magenta' },
  { label: 'Operations', color: 'orange' },
] as const;
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="plain" label="Plain" />
      <h-switch v-model="disabled" label="Disabled" />
    </div>
    <div class="tag-row">
      <h-tag
        v-for="item in labels"
        :key="item.label"
        :color="item.color"
        :plain="plain"
        :disabled="disabled"
        :clickable="false"
      >
        {{ item.label }}
      </h-tag>
    </div>
  </section>
</template>

<style scoped>
.tag-row {
  display: flex;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
