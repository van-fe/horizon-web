<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__stage">
      <h-empty :size="120" description="No saved views in this workspace.">
        <template #image>
          <div class="empty-image-frame">
            <img :src="demoAssetUrl('empty-state.svg')" alt="No saved views" />
          </div>
        </template>
      </h-empty>
    </div>
  </section>
</template>

<style scoped>
.empty-image-frame {
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-circle);
  background: var(--h-bg-secondary);
}

.empty-image-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
