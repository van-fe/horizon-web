<template>
  <div class="flex flex-wrap">
    <div v-for="name in presentedImageNameList" :key="name">
      <h-empty :image="HEmpty.PRESENTED_IMAGES[name]" :description="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { HEmpty } from '@aurora/horizon-web';

type PresentedImageName = keyof typeof HEmpty.PRESENTED_IMAGES;

const presentedImageNameList = ref<PresentedImageName[]>(
  Object.keys(HEmpty.PRESENTED_IMAGES) as PresentedImageName[],
);
</script>
