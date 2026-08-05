<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import { ref } from 'vue';

type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

const fit = ref<ObjectFit>('cover');
const fits: ObjectFit[] = ['fill', 'contain', 'cover', 'none', 'scale-down'];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="fit" size="small">
        <h-segmented-item v-for="item in fits" :key="item" :value="item" :label="item" />
      </h-segmented>
    </div>

    <div class="image-frame">
      <h-image
        :src="demoAssetUrl('scene-city.svg')"
        alt="City artwork inside a fixed frame"
        width="100%"
        height="100%"
        :object-fit="fit"
      />
    </div>
  </section>
</template>

<style scoped>
.image-frame {
  width: min(100%, 520px);
  height: 240px;
  overflow: hidden;
  border-radius: var(--h-radius-l);
  background: var(--h-bg-secondary);
}
</style>
