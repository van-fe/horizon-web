<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
</script>

<template>
  <div class="chat-bubble-basic-demo" role="log" aria-label="Release support conversation">
    <h-chat-bubble
      :avatar="demoAssetUrl('avatar-cyan.svg')"
      name="Horizon Assistant"
      datetime="10:24"
      content="The accessibility checks are complete. Would you like a summary of the remaining release risks?"
      aria-label="Message from Horizon Assistant at 10:24"
    />
    <h-chat-bubble
      :avatar="demoAssetUrl('avatar-indigo.svg')"
      placement="end"
      variant="primary"
      name="You"
      datetime="10:25"
      status="Read"
      content="Yes—group them by severity and include the owner for each follow-up."
      aria-label="Message from you at 10:25, read"
    />
  </div>
</template>

<style scoped>
.chat-bubble-basic-demo {
  display: flex;
  flex-direction: column;
  gap: var(--h-spacing-5);
}
</style>
