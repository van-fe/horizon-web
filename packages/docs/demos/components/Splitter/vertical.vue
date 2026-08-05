<script setup lang="ts">
import { ref } from 'vue';

const sizes = ref([62, 38]);
</script>

<template>
  <h-splitter v-model="sizes" class="splitter-vertical-demo" direction="vertical">
    <h-splitter-panel :size="62" :min="35" :max="78">
      <div class="splitter-vertical-demo__panel">
        <strong>Preview</strong>
        <small>min 35% · max 78%</small>
      </div>
    </h-splitter-panel>
    <h-splitter-panel :min="20" collapsible>
      <div class="splitter-vertical-demo__panel">
        <strong>Output</strong>
        <small>min 20% · collapsible</small>
      </div>
    </h-splitter-panel>
  </h-splitter>
</template>

<style scoped>
.splitter-vertical-demo {
  block-size: 320px;
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.splitter-vertical-demo__panel {
  display: grid;
  block-size: 100%;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: var(--h-spacing-2);
  color: var(--h-text-primary);
}

.splitter-vertical-demo__panel small {
  color: var(--h-text-secondary);
}
</style>
