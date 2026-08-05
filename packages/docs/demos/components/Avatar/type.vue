<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import { ref } from 'vue';
import type { AvatarProps } from '@aurora/horizon-web';

const size = ref<AvatarProps['size']>('medium');
const fit = ref<NonNullable<AvatarProps['fit']>>('cover');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">Size</span>
        <h-segmented v-model:active-key="size" size="small">
          <h-segmented-item value="small" label="Small" />
          <h-segmented-item value="medium" label="Medium" />
          <h-segmented-item value="large" label="Large" />
        </h-segmented>
      </label>
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">Fit</span>
        <h-segmented v-model:active-key="fit" size="small">
          <h-segmented-item value="contain" label="Contain" />
          <h-segmented-item value="cover" label="Cover" />
          <h-segmented-item value="fill" label="Fill" />
        </h-segmented>
      </label>
    </div>

    <h-avatar :size="size" :src="demoAssetUrl('avatar-cyan.svg')" :fit="fit" />
  </section>
</template>
