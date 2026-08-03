<script setup lang="ts">
import { ref } from 'vue';

const name = ref<'collapse' | 'collapse-horizontal'>('collapse');
const visible = ref(true);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="name" size="small">
        <h-segmented-item key="collapse" label="Vertical" />
        <h-segmented-item key="collapse-horizontal" label="Horizontal" />
      </h-segmented>
      <h-switch v-model="visible" label="Expanded" />
    </div>
    <div class="stage">
      <h-transition :name="name">
        <div v-show="visible" class="sample">Collapsible content</div>
      </h-transition>
    </div>
  </section>
</template>

<style scoped>
.stage {
  min-height: 72px;
}

.sample {
  width: 200px;
  overflow: hidden;
  border-radius: var(--h-radius-m);
  padding: var(--h-spacing-4);
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
  box-sizing: border-box;
  white-space: nowrap;
}
</style>
