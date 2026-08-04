<script setup lang="ts">
import { ref } from 'vue';

const name = ref<'fade-in-linear' | 'fade-in'>('fade-in');
const visible = ref(true);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="name" size="small">
        <h-segmented-item value="fade-in-linear" label="Linear" />
        <h-segmented-item value="fade-in" label="Ease" />
      </h-segmented>
      <h-switch v-model="visible" label="Visible" />
    </div>
    <div class="stage">
      <h-transition :name="name"><div v-show="visible" class="sample">Fade</div></h-transition>
    </div>
  </section>
</template>

<style scoped>
.stage {
  min-height: 88px;
}

.sample {
  width: 120px;
  border-radius: var(--h-radius-m);
  padding: var(--h-spacing-5);
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
  text-align: center;
}
</style>
