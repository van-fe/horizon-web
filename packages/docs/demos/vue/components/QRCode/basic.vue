<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="expired" label="Expired state" />
    </div>

    <div class="docs-demo__stage">
      <h-q-r-code :value="previewUrl" :expired="expired" @refresh="refresh" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const previewUrl = 'https://horizon.example/releases/3.8-preview';
const expired = ref(false);

function refresh() {
  expired.value = false;
}
</script>
