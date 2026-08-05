<script setup lang="ts">
import { ref } from 'vue';
import type { HImageAction } from '@aurora/horizon-web';

const status = ref('Hover the image to show actions');
const actions: HImageAction[] = [
  { icon: 'scale_big', title: 'Inspect', handler: () => (status.value = 'Inspect') },
  { icon: 'download', title: 'Export', handler: () => (status.value = 'Export') },
  { icon: 'rubbish', title: 'Archive', handler: () => (status.value = 'Archive') },
];
</script>

<template>
  <section class="docs-demo">
    <h-image
      src="/demo-assets/scene-aurora.svg"
      alt="Aurora campaign asset"
      width="100%"
      max-width="420px"
      aspect-ratio="4/3"
      rounded="10"
      show-actions
      :actions-list="actions"
    />
    <p class="docs-demo__status" role="status">{{ status }}</p>
  </section>
</template>
