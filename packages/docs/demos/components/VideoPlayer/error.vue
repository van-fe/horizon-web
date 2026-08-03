<script setup lang="ts">
import { ref } from 'vue';

const key = ref(0);
const failed = ref(false);
const sources = [{ src: 'data:video/mp4;base64,AAAA', type: 'video/mp4' }];
</script>

<template>
  <section class="docs-demo">
    <h-video-player
      :key="key"
      :sources="sources"
      poster="/demo-assets/video-poster.svg"
      preload="metadata"
      @error="failed = true"
    />
    <h-alert
      v-if="failed"
      :closable="false"
      show-icon
      type="error"
      title="Video unavailable"
      description="The source could not be decoded."
    />
    <div class="docs-demo__actions">
      <h-button @click="key += 1">Retry</h-button>
    </div>
  </section>
</template>
