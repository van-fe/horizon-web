<script setup lang="ts">
import { ref } from 'vue';

const plain = ref(false);
const disabled = ref(false);
const labels = ['Core', 'Infrastructure', 'Experience', 'Growth', 'Operations'];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="plain" label="Plain" />
      <h-switch v-model="disabled" label="Disabled" />
    </div>
    <div class="tag-row">
      <h-tag
        v-for="label in labels"
        :key="label"
        auto-color
        :plain="plain"
        :disabled="disabled"
        :clickable="false"
      >
        {{ label }}
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
