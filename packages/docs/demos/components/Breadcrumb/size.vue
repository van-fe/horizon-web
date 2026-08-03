<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
const path = [{ text: 'Projects' }, { text: 'Horizon Web' }, { text: 'Release 2.8' }];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="size" size="small">
        <h-segmented-item key="small" label="Small" />
        <h-segmented-item key="medium" label="Medium" />
      </h-segmented>
    </div>
    <h-breadcrumb :texts="path" :size="size" title />
  </section>
</template>
