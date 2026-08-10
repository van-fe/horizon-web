<script setup lang="ts">
import { ref } from 'vue';

const capacity = ref(40);
</script>

<template>
  <section class="docs-demo">
    <h-slider
      v-model="capacity"
      :step="10"
      show-separator
      :tooltip-formatter="value => `${value} GB`"
    />
    <p class="docs-demo__status">{{ capacity }} GB</p>
  </section>
</template>
