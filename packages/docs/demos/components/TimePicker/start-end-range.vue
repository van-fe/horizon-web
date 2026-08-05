<script setup lang="ts">
import { computed, ref, watch } from 'vue';

type WindowMode = 'day' | 'overnight';

const mode = ref<WindowMode>('day');
const value = ref('10:30');
const startAt = computed(() => (mode.value === 'day' ? '08' : '00'));
const endAt = computed(() => (mode.value === 'day' ? '21' : '30'));

watch(mode, nextMode => {
  value.value = nextMode === 'day' ? '10:30' : '02:00';
});
</script>

<template>
  <section class="time-picker-start-end-demo">
    <h-segmented v-model:active-key="mode" size="small" block aria-label="候选时间窗口">
      <h-segmented-item value="day" label="08:00–21:00" />
      <h-segmented-item value="overnight" label="00:00–次日 06:00" />
    </h-segmented>
    <h-time-picker
      v-model="value"
      :start-at="startAt"
      :end-at="endAt"
      value-format="HH:mm"
      :clearable="false"
      :to-body="false"
      aria-label="限定候选窗口的时间"
    />
    <small aria-live="polite">start-at="{{ startAt }}" · end-at="{{ endAt }}" · {{ value }}</small>
  </section>
</template>

<style scoped>
.time-picker-start-end-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 520px;
}

.time-picker-start-end-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
