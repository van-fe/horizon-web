<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import { ref } from 'vue';

const brokenSrc = 'data:image/png;base64,not-a-valid-local-image';
const src = ref(brokenSrc);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions">
      <h-button @click="src = src === brokenSrc ? demoAssetUrl('scene-aurora.svg') : brokenSrc">
        {{ src === brokenSrc ? 'Use fallback' : 'Simulate failure' }}
      </h-button>
    </div>

    <h-image
      :src="src"
      alt="Campaign artwork"
      width="100%"
      max-width="480px"
      aspect-ratio="4/3"
      rounded="10"
    >
      <template #error>
        <div class="error-state">Preview unavailable</div>
      </template>
    </h-image>
  </section>
</template>

<style scoped>
.error-state {
  display: grid;
  height: 100%;
  place-items: center;
  color: var(--h-text-error-default);
  background: var(--h-bg-error-weak-default);
}
</style>
