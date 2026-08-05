<script setup lang="ts">
import { ref } from 'vue';

const value = ref(45);
const disabled = ref(true);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls"><h-switch v-model="disabled" label="Disabled" /></div>
    <h-slider v-model="value" :disabled="disabled" />
    <p class="docs-demo__status">{{ value }}</p>
  </section>
</template>
