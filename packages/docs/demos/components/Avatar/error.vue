<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
const missingAvatar = 'data:image/png;base64,not-an-image';
</script>

<template>
  <section class="docs-demo avatar-error-demo">
    <h-avatar
      size="large"
      :src="missingAvatar"
      :default="demoAssetUrl('avatar-indigo.svg')"
      aria-label="Fallback avatar"
    />
    <span>Fallback asset shown after the image fails to load.</span>
  </section>
</template>

<style scoped>
.avatar-error-demo {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-3);
}

.avatar-error-demo span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
