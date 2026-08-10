<script setup lang="ts">
import { ref } from 'vue';

const singleValue = ref<string | null>('10:00');
const rangeValue = ref<[string, string] | null>(['09:00', '11:00']);

function describeValue(value: unknown) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return `[${value.join(', ')}]`;
  return String(value);
}
</script>

<template>
  <section class="time-picker-initial-demo">
    <label>
      <span>单值</span>
      <h-time-picker
        v-model="singleValue"
        value-format="HH:mm"
        :initial-value="null"
        clearable
        :to-body="false"
        aria-label="可清空为 null 的单值时间"
      />
      <small aria-live="polite">{{ describeValue(singleValue) }}</small>
    </label>
    <label>
      <span>范围</span>
      <h-time-picker
        v-model="rangeValue"
        value-format="HH:mm"
        is-range
        :initial-value="null"
        clearable
        :to-body="false"
        aria-label="可清空为 null 的时间范围"
      />
      <small aria-live="polite">{{ describeValue(rangeValue) }}</small>
    </label>
  </section>
</template>

<style scoped>
.time-picker-initial-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.time-picker-initial-demo label {
  display: grid;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
}

.time-picker-initial-demo span,
.time-picker-initial-demo small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .time-picker-initial-demo {
    grid-template-columns: 1fr;
  }
}
</style>
