<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { HCalendarPinFlag } from '@aurora/horizon-web';

const weekStart = dayjs().startOf('week');
const currentDate = ref(dayjs().format('YYYY-MM-DD'));
const showSpacing = ref(true);
const allowCrossing = ref(false);
const status = ref('Drag on the timeline to add a session');

const pinFlags = ref<HCalendarPinFlag[]>([
  {
    title: 'Planning',
    startAt: weekStart.day(1).hour(9),
    endAt: weekStart.day(1).hour(10),
    type: 'info',
    clickable: true,
  },
  {
    title: 'Build',
    startAt: weekStart.day(1).hour(10).minute(30),
    endAt: weekStart.day(1).hour(14),
    type: 'success',
    clickable: true,
  },
  {
    title: 'Review',
    startAt: weekStart.day(3).hour(13),
    endAt: weekStart.day(3).hour(15),
    type: 'warning',
    clickable: true,
  },
]);

function onFlagClick(flag: HCalendarPinFlag) {
  status.value = `Selected ${String(flag.title ?? 'session')}`;
}

function onCreatingPinFlag(date: Dayjs) {
  status.value = `Planning from ${date.format('ddd HH:mm')}`;
  return { title: 'Focus session', type: 'pill' as const };
}

async function onCreateFinished() {
  status.value = 'Session added';
  return true;
}

function disableHours(date: Dayjs): Array<[Dayjs, Dayjs]> {
  if ([0, 6].includes(date.day())) {
    return [[date.startOf('day'), date.endOf('day')]];
  }

  return [
    [date.startOf('day'), date.hour(8)],
    [date.hour(12), date.hour(13)],
    [date.hour(18), date.endOf('day')],
  ];
}
</script>

<template>
  <div class="calendar-timeline-demo">
    <h-space wrap>
      <h-switch v-model="showSpacing" label="Space flags" status />
      <h-switch v-model="allowCrossing" label="Cross blocked hours" status />
    </h-space>
    <p aria-live="polite">{{ status }}</p>

    <div class="calendar-timeline-demo-viewport">
      <h-calendar
        v-model="currentDate"
        v-model:pin-flags="pinFlags"
        mode="week"
        mode-switchable
        :mode-switchable-list="['week', 'day']"
        enable-create-pin-flags
        pin-flags-show-time
        :creating-pin-flag-callback="onCreatingPinFlag"
        :creat-finish-flag-callback="onCreateFinished"
        :create-flag-can-though-disable-date-or-hour="allowCrossing"
        :show-spacing-between-flags="showSpacing"
        :disable-hours="disableHours"
        @pin-flag-click="onFlagClick"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar-timeline-demo {
  display: grid;
  gap: var(--h-spacing-3);
  min-width: 0;
}

.calendar-timeline-demo p {
  margin: 0;
  font-size: var(--h-text-sm);
  color: var(--h-text-secondary);
}

.calendar-timeline-demo-viewport {
  min-width: 0;
  height: min(82vh, 760px);
  min-height: 660px;
  overflow: auto;
}

@media (width <= 520px) {
  .calendar-timeline-demo-viewport {
    height: 640px;
    min-height: 0;
  }
}
</style>
