<script setup lang="ts">
import { ref } from 'vue';

const value = ref<[number, number]>([25, 70]);
</script>

<template>
  <section class="docs-demo">
    <h-slider
      v-model="value"
      range
      :min="0"
      :max="120"
      :step="5"
      :tooltip-formatter="item => `${item}s`"
    />
    <p class="docs-demo__status">{{ value[0] }}s – {{ value[1] }}s</p>
  </section>
</template>
