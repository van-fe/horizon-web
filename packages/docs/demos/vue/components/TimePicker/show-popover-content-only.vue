<script setup lang="ts">
import { ref } from 'vue';

const value = ref('09:30');
</script>

<template>
  <section class="docs-demo time-picker-content-demo">
    <div class="time-picker-content-demo__panel">
      <h-time-picker
        v-model="value"
        value-format="HH:mm"
        show-popover-content-only
        :clearable="false"
      />
    </div>
    <p class="docs-demo__status" aria-live="polite">每日提醒：{{ value }}</p>
  </section>
</template>

<style scoped>
.time-picker-content-demo__panel {
  max-width: 100%;
  overflow-x: auto;
}
</style>
