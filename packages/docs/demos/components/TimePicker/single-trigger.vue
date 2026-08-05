<script setup lang="ts">
import { ref } from 'vue';

const linkPanels = ref(true);
const value = ref<[string, string]>(['09:30', '11:00']);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="linkPanels" label="Link panels" />
    </div>

    <h-time-picker
      v-model="value"
      value-format="HH:mm"
      is-range
      single-trigger
      :is-link-panels="linkPanels"
      :clearable="false"
      :to-body="false"
    />
    <p class="docs-demo__status">{{ value.join(' → ') }}</p>
  </section>
</template>
