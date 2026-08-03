<script setup lang="ts">
import { computed, ref } from 'vue';

const direction = ref<'up' | 'right' | 'down' | 'left'>('up');
const visible = ref(true);
const name = computed(() => `slide-${direction.value}` as const);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="direction" size="small">
        <h-segmented-item key="up" label="Up" />
        <h-segmented-item key="right" label="Right" />
        <h-segmented-item key="down" label="Down" />
        <h-segmented-item key="left" label="Left" />
      </h-segmented>
      <h-switch v-model="visible" label="Visible" />
    </div>
    <div class="stage">
      <h-transition :name="name"><div v-show="visible" class="sample">Slide</div></h-transition>
    </div>
  </section>
</template>

<style scoped>
.stage {
  display: grid;
  min-height: 100px;
  overflow: hidden;
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
