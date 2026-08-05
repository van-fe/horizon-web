<script setup lang="ts">
import { ref } from 'vue';

const reminder = ref<string | undefined>('10:15');
const quietHours = ref<[string, string] | undefined>(['22:00', '07:30']);
const status = ref('悬停输入框并点击清空图标');
</script>

<template>
  <section class="time-picker-clearable-demo">
    <label>
      <span>单值</span>
      <h-time-picker
        v-model="reminder"
        value-format="HH:mm"
        clearable
        :to-body="false"
        placeholder="选择提醒时间"
        @clear="status = '单值已清空'"
      />
      <small>modelValue: {{ reminder ?? 'undefined' }}</small>
    </label>
    <label>
      <span>范围</span>
      <h-time-picker
        v-model="quietHours"
        value-format="HH:mm"
        is-range
        clearable
        :is-link-panels="false"
        :to-body="false"
        @clear="status = '范围已清空'"
      />
      <small>modelValue: {{ quietHours ? quietHours.join(' → ') : 'undefined' }}</small>
    </label>
    <small class="time-picker-clearable-demo__status" aria-live="polite">{{ status }}</small>
  </section>
</template>

<style scoped>
.time-picker-clearable-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.time-picker-clearable-demo label {
  display: grid;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
}

.time-picker-clearable-demo span,
.time-picker-clearable-demo small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.time-picker-clearable-demo__status {
  grid-column: 1 / -1;
}

@media (max-width: 390px) {
  .time-picker-clearable-demo {
    grid-template-columns: 1fr;
  }

  .time-picker-clearable-demo__status {
    grid-column: auto;
  }
}
</style>
