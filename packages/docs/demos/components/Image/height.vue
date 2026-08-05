<script setup lang="ts">
import { computed, ref } from 'vue';

const height = ref('240');
const imageHeight = computed(() => Number(height.value));
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="height" size="small">
        <h-segmented-item value="180" label="180 px" />
        <h-segmented-item value="240" label="240 px" />
        <h-segmented-item value="320" label="320 px" />
      </h-segmented>
    </div>

    <h-image
      src="/demo-assets/scene-summit.svg"
      alt="Mountain summit campaign artwork"
      width="100%"
      :height="imageHeight"
      :max-height="320"
      object-fit="cover"
      rounded="12"
    />
  </section>
</template>
