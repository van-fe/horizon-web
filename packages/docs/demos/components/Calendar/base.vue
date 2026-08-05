<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';

const value = ref(dayjs().format('YYYY-MM-DD'));
const mode = ref<'year' | 'month' | 'week'>('month');
</script>

<template>
  <div class="calendar-basic-demo">
    <p aria-live="polite">{{ value }} · {{ mode }}</p>
    <div class="calendar-basic-demo-viewport">
      <h-calendar
        v-model="value"
        v-model:mode="mode"
        auto-fit
        mode-switchable
        :mode-switchable-list="['year', 'month', 'week']"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar-basic-demo {
  display: grid;
  gap: var(--h-spacing-3);
  min-width: 0;
}

.calendar-basic-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}

.calendar-basic-demo-viewport {
  min-width: 0;
  height: min(72vh, 640px);
  min-height: 540px;
  overflow: auto;
}

@media (width <= 520px) {
  .calendar-basic-demo-viewport {
    height: 520px;
    min-height: 0;
  }
}
</style>
