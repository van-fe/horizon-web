<template>
  <section class="docs-demo">
    <h-result :primary-button="false" :secondary-button="false">
      <template #icon>
        <IconLogo size="56" :color="['var(--h-text-primary)']" />
      </template>
      <template #title>Battery swap complete</template>
      <template #subtitle>Vehicle A·8F26 is ready. The session added 62 kWh in 4 minutes.</template>
      <template #extra>
        <h-button>Save receipt</h-button>
      </template>
    </h-result>
  </section>
</template>

<script setup lang="ts">
import { IconLogo } from '@aurora/icon';
</script>
