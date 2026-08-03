<script setup lang="ts">
import { ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';

const visible = ref(false);
const status = ref('Select the second marker in the viewer');
const sources: HViewerSource[] = [
  {
    type: 'image',
    cover: '/demo-assets/scene-coast.svg',
    thumbnail: '/demo-assets/scene-coast.svg',
    title: 'Coastal launch campaign',
    legends: [
      { x: 420, y: 310, label: 'Headline safe area' },
      {
        x: 920,
        y: 220,
        label: 'Contrast check',
        handler: () => (status.value = 'Contrast marker selected'),
      },
    ],
  },
];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions"><h-button @click="visible = true">Open legends</h-button></div>
    <p class="docs-demo__status">{{ status }}</p>
    <h-viewer v-model="visible" :sources="sources" />
  </section>
</template>
