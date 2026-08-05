<script setup lang="ts">
import { ref } from 'vue';

type Reminder = { id: number; label: string; time: string };

const reminders = ref<Reminder[]>([{ id: 1, label: '提醒 1', time: '09:00' }]);
let nextId = 2;

function addReminder() {
  if (reminders.value.length >= 2) return;
  reminders.value.push({
    id: nextId,
    label: `提醒 ${nextId}`,
    time: '14:00',
  });
  nextId += 1;
}

function removeReminder(id: number) {
  reminders.value = reminders.value.filter(item => item.id !== id);
}
</script>

<template>
  <section class="time-picker-multiple-demo">
    <h-button
      class="time-picker-multiple-demo__action"
      size="small"
      :disabled="reminders.length >= 2"
      @click="addReminder"
    >
      添加提醒
    </h-button>
    <div class="time-picker-multiple-demo__list">
      <div v-for="reminder in reminders" :key="reminder.id">
        <label>
          <span>{{ reminder.label }}</span>
          <h-time-picker
            v-model="reminder.time"
            value-format="HH:mm"
            :to-body="false"
            placeholder="选择提醒时间"
            :aria-label="reminder.label"
          />
        </label>
        <h-button
          size="small"
          type="normal"
          :disabled="reminders.length === 1"
          @click="removeReminder(reminder.id)"
        >
          移除
        </h-button>
      </div>
    </div>
    <small aria-live="polite">{{ reminders.length }} 个独立时间项</small>
  </section>
</template>

<style scoped>
.time-picker-multiple-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.time-picker-multiple-demo__list > div,
.time-picker-multiple-demo__list label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-3);
}

.time-picker-multiple-demo__list label > span,
.time-picker-multiple-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.time-picker-multiple-demo__list {
  display: grid;
  gap: var(--h-spacing-2);
}

.time-picker-multiple-demo__action {
  justify-self: start;
}

.time-picker-multiple-demo__list > div {
  padding-block: var(--h-spacing-1);
}

.time-picker-multiple-demo__list label {
  justify-content: flex-start;
  min-width: 0;
  flex: 1;
}

.time-picker-multiple-demo__list label > span {
  width: 88px;
  flex: none;
}

@media (max-width: 390px) {
  .time-picker-multiple-demo__list > div,
  .time-picker-multiple-demo__list label {
    align-items: stretch;
    flex-direction: column;
  }

  .time-picker-multiple-demo__list label > span {
    width: auto;
  }
}
</style>
