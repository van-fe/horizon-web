<template>
  <div class="flex flex-wrap">
    <div v-for="name in presentedImageNameList" :key="name">
      <h-empty :image="NEmpty.PRESENTED_IMAGES[name]" :description="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NEmpty } from '@aurora/horizon-web';

type PresentedImageName = keyof typeof NEmpty.PRESENTED_IMAGES;

const presentedImageNameList = ref<PresentedImageName[]>(
  Object.keys(NEmpty.PRESENTED_IMAGES) as PresentedImageName[],
);
</script>
