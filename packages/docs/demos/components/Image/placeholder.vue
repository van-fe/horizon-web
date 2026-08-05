<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import { ref } from 'vue';

const src = ref('');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions">
      <h-button @click="src = src ? '' : demoAssetUrl('scene-forest.svg')">
        {{ src ? 'Reset' : 'Load image' }}
      </h-button>
    </div>

    <h-image
      :src="src"
      alt="Forest campaign asset"
      width="100%"
      max-width="480px"
      aspect-ratio="4/3"
      rounded="10"
    >
      <template #placeholder>
        <div class="placeholder">Awaiting artwork</div>
      </template>
    </h-image>
  </section>
</template>

<style scoped>
.placeholder {
  display: grid;
  height: 100%;
  place-items: center;
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
}
</style>
