<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';

const value = ref(dayjs().format('YYYY-MM-DD'));
const status = ref('Choose a milestone date');

function onDateClick(date: string) {
  status.value = `Selected ${date}`;
}
</script>

<template>
  <div class="calendar-year-demo">
    <p aria-live="polite">{{ status }}</p>
    <div class="calendar-year-demo-viewport">
      <h-calendar
        v-model="value"
        mode="year"
        date-type="only-current"
        pickable
        auto-fit
        @date-click="onDateClick"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar-year-demo {
  display: grid;
  gap: var(--h-spacing-3);
  min-width: 0;
}

.calendar-year-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}

.calendar-year-demo-viewport {
  min-width: 0;
  height: min(72vh, 640px);
  min-height: 540px;
  overflow: auto;
}

@media (width <= 520px) {
  .calendar-year-demo-viewport {
    height: 520px;
    min-height: 0;
  }
}
</style>
