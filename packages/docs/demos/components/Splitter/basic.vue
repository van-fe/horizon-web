<script setup lang="ts">
import { ref } from 'vue';

const sizes = ref([30, 70]);
</script>

<template>
  <h-splitter v-model="sizes" class="splitter-basic-demo">
    <h-splitter-panel :size="30">
      <div class="splitter-basic-demo__panel splitter-basic-demo__panel--muted">Navigation</div>
    </h-splitter-panel>
    <h-splitter-panel :size="70">
      <div class="splitter-basic-demo__panel">Content</div>
    </h-splitter-panel>
  </h-splitter>
</template>

<style scoped>
.splitter-basic-demo {
  block-size: 280px;
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.splitter-basic-demo__panel {
  display: grid;
  block-size: 100%;
  place-items: center;
  color: var(--h-text-primary);
  white-space: nowrap;
}

.splitter-basic-demo__panel--muted {
  color: var(--h-text-secondary);
}
</style>
