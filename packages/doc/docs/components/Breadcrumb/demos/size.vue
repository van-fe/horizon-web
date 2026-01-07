<template>
  <div>
    <div class="text-subtitle-2 mb-2">medium(default)</div>
    <h-breadcrumb
      :separator="IconArrowRight"
      :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]"
    />
    <div class="text-subtitle-2 mt-4 mb-2">small</div>
    <h-breadcrumb
      :separator="IconArrowRight"
      size="small"
      :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]"
    />
  </div>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@aurora/icon';
</script>
