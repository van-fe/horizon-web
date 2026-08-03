<script setup lang="ts">
import { ref } from 'vue';

const value = ref(120);
const enabled = ref(true);
const placement = ref<'top' | 'bottom'>('top');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="enabled" label="Tooltip" />
      <h-segmented v-model:active-key="placement" size="small">
        <h-segmented-item key="top" label="Top" />
        <h-segmented-item key="bottom" label="Bottom" />
      </h-segmented>
    </div>
    <h-slider
      v-model="value"
      :min="20"
      :max="300"
      :step="10"
      :tooltip-enable="enabled"
      :tooltip-placement="placement"
      :tooltip-formatter="item => `${item} seats`"
    />
  </section>
</template>
