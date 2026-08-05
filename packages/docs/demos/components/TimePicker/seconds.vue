<script setup lang="ts">
import { ref } from 'vue';

const checkpoint = ref('12:30:15');
</script>

<template>
  <label class="time-picker-seconds-demo">
    <span>秒级时间</span>
    <h-time-picker
      v-model="checkpoint"
      type="seconds"
      value-format="HH:mm:ss"
      :clearable="false"
      :second-step="5"
      :to-body="false"
      aria-label="秒级时间"
    />
    <small aria-live="polite">{{ checkpoint }} · second-step="5"</small>
  </label>
</template>

<style scoped>
.time-picker-seconds-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.time-picker-seconds-demo > span,
.time-picker-seconds-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
