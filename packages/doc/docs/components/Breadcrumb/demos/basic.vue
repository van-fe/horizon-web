<template>
  <n-breadcrumb
    :separator="IconArrowRight"
    :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]"
  />
</template>

<script setup lang="ts">
import { IconArrowRight } from '@nio-fe/icon';
</script>
