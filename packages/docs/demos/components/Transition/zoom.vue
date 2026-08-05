<script setup lang="ts">
import { ref } from 'vue';

const name = ref<'zoom-in-center' | 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left'>(
  'zoom-in-center',
);
const speed = ref<'fast' | 'normal' | 'slow'>('normal');
const visible = ref(true);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-select v-model="name" :to-body="false" aria-label="Zoom origin">
        <h-option label="Center" value="zoom-in-center" />
        <h-option label="Top" value="zoom-in-top" />
        <h-option label="Bottom" value="zoom-in-bottom" />
        <h-option label="Left" value="zoom-in-left" />
      </h-select>
      <h-segmented v-model:active-key="speed" size="small">
        <h-segmented-item value="fast" label="Fast" />
        <h-segmented-item value="normal" label="Normal" />
        <h-segmented-item value="slow" label="Slow" />
      </h-segmented>
      <h-switch v-model="visible" label="Visible" />
    </div>
    <div class="stage">
      <h-transition :name="name" :speed="speed">
        <div v-show="visible" class="sample">Zoom</div>
      </h-transition>
    </div>
  </section>
</template>

<style scoped>
.stage {
  display: grid;
  min-height: 100px;
  place-items: center;
}

.sample {
  width: 140px;
  border-radius: var(--h-radius-m);
  padding: var(--h-spacing-5);
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
  text-align: center;
}
</style>
