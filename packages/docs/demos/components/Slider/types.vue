<script setup lang="ts">
import { ref } from 'vue';

type SliderType = 'primary' | 'info' | 'success' | 'warning' | 'danger';

const type = ref<SliderType>('primary');
const value = ref(64);
const types: SliderType[] = ['primary', 'info', 'success', 'warning', 'danger'];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="type" size="small">
        <h-segmented-item v-for="item in types" :key="item" :value="item" :label="item" />
      </h-segmented>
    </div>
    <h-slider v-model="value" :type="type" />
  </section>
</template>
