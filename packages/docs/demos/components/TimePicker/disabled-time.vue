<script setup lang="ts">
import { ref } from 'vue';
import type { Dayjs } from 'dayjs';

const reviewTime = ref('10:30');
const supportWindow = ref<[string, string]>(['09:30', '17:30']);

function disabledOutsideBusinessHours(time: Dayjs) {
  const minutes = time.hour() * 60 + time.minute();
  return minutes < 9 * 60 + 30 || minutes > 18 * 60;
}
</script>

<template>
  <section class="time-picker-disabled-time-demo">
    <label>
      <span>单值 · 09:30–18:00</span>
      <h-time-picker
        v-model="reviewTime"
        value-format="HH:mm"
        :clearable="false"
        :disabled-time="disabledOutsideBusinessHours"
        :to-body="false"
        aria-label="受限单值时间"
      />
    </label>
    <label>
      <span>范围 · 09:30–18:00</span>
      <h-time-picker
        v-model="supportWindow"
        value-format="HH:mm"
        is-range
        :clearable="false"
        :disabled-time="disabledOutsideBusinessHours"
        :to-body="false"
        aria-label="受限时间范围"
      />
    </label>
  </section>
</template>

<style scoped>
.time-picker-disabled-time-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.time-picker-disabled-time-demo label {
  display: grid;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
}

.time-picker-disabled-time-demo span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .time-picker-disabled-time-demo {
    grid-template-columns: 1fr;
  }
}
</style>
