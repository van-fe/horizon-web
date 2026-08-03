<script setup lang="ts">
import { ref } from 'vue';

const value = ref(62);
</script>

<template>
  <section class="docs-demo">
    <h-slider v-model="value" aria-label="任务完成度" />
    <p class="docs-demo__status">{{ value }}%</p>
  </section>
</template>
