<script setup lang="ts">
import { computed, ref } from 'vue';

const value = ref<[string, string]>(['09:00', '11:30']);
const duration = computed(() => {
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  const minutes = toMinutes(value.value[1]) - toMinutes(value.value[0]);
  return `${Math.floor(minutes / 60)} 小时 ${minutes % 60} 分钟`;
});
</script>

<template>
  <section class="time-picker-range-demo">
    <h-time-picker
      v-model="value"
      value-format="HH:mm"
      is-range
      :clearable="false"
      :to-body="false"
      start-placeholder="会议开始"
      end-placeholder="会议结束"
      aria-label="会议时间范围"
    />
    <small aria-live="polite">{{ value.join(' → ') }} · {{ duration }}</small>
  </section>
</template>

<style scoped>
.time-picker-range-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 560px;
}

.time-picker-range-demo > small {
  color: var(--h-text-secondary);
}
</style>
