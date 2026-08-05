<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';

const value = ref(dayjs().format('YYYY-MM-DD'));
const mode = ref<'year' | 'month' | 'week' | 'day'>('month');
</script>

<template>
  <div class="calendar-date-type-demo">
    <p>{{ mode }} · only-current</p>
    <div class="calendar-date-type-demo-viewport">
      <h-calendar
        v-model="value"
        v-model:mode="mode"
        date-type="only-current"
        mode-switchable
        :mode-switchable-list="['year', 'month', 'week', 'day']"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar-date-type-demo {
  display: grid;
  gap: var(--h-spacing-3);
  min-width: 0;
}

.calendar-date-type-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}

.calendar-date-type-demo-viewport {
  min-width: 0;
  height: min(78vh, 720px);
  min-height: 560px;
  overflow: auto;
}

@media (width <= 520px) {
  .calendar-date-type-demo-viewport {
    height: 560px;
    min-height: 0;
  }
}
</style>
