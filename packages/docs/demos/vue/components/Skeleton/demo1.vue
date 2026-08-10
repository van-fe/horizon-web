<template>
  <section class="docs-demo">
    <label class="docs-demo__control">
      <span class="docs-demo__control-label">
        动画 ·
        <code>animated</code>
      </span>
      <h-switch v-model="isAnimated" label="Animated" />
    </label>

    <div class="skeleton-preview" aria-busy="true">
      <h-skeleton :animated="isAnimated" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isAnimated = ref(true);
</script>

<style scoped>
.skeleton-preview {
  border-radius: var(--h-radius-l);
  padding: var(--h-spacing-5);
  background: var(--h-bg-secondary);
}

@media (max-width: 520px) {
  .skeleton-preview {
    padding: var(--h-spacing-4);
  }
}
</style>
