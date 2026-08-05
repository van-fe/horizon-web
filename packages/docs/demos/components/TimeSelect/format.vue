<script setup lang="ts">
import { ref } from 'vue';

const value = ref('18:00');
const format = ref<'HH:mm' | 'hh:mm A'>('hh:mm A');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="format" size="small">
        <h-segmented-item value="HH:mm" label="24-hour" />
        <h-segmented-item value="hh:mm A" label="12-hour" />
      </h-segmented>
    </div>
    <h-time-select
      v-model="value"
      start="00:00"
      step="00:30"
      end="23:30"
      include-end-time
      :format="format"
      :to-body="false"
    />
    <p class="docs-demo__status">modelValue: {{ value }}</p>
  </section>
</template>
