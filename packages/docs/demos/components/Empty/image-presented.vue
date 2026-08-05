<template>
  <section class="docs-demo">
    <label class="docs-demo__control">
      <span class="docs-demo__control-label">内置图片</span>
      <h-select v-model="selectedImage" :to-body="false">
        <h-option v-for="name in imageNames" :key="name" :value="name" :label="formatName(name)" />
      </h-select>
    </label>

    <div class="docs-demo__stage">
      <h-empty
        :image="HEmpty.PRESENTED_IMAGES[selectedImage]"
        :description="formatName(selectedImage)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { HEmpty } from '@aurora/horizon-web';

type PresentedImageName = keyof typeof HEmpty.PRESENTED_IMAGES;

const imageNames = Object.keys(HEmpty.PRESENTED_IMAGES) as PresentedImageName[];
const selectedImage = ref<PresentedImageName>('EMPTY_DEFAULT');

function formatName(name: string) {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, value => value.toUpperCase());
}
</script>
