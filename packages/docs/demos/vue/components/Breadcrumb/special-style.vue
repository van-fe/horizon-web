<template>
  <section class="docs-demo">
    <h-breadcrumb
      title
      :separator="IconArrowRight"
      :texts="[
        { text: 'Projects' },
        { text: 'International customer experience research programme' },
        { text: 'Findings' },
      ]"
    />
  </section>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@aurora/icon';
</script>
