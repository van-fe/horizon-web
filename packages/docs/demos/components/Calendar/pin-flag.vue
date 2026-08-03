<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { HCalendarPinFlag } from '@aurora/horizon-web';

type FinishBehavior = 'Discard' | 'Keep' | 'Rename';

const monthStart = dayjs().startOf('month');
const currentDate = ref(monthStart.format('YYYY-MM-DD'));
const finishBehavior = ref<FinishBehavior>('Keep');
const status = ref('Drag across dates to create a milestone');

const pinFlags = ref<HCalendarPinFlag[]>([
  {
    title: 'Release freeze',
    startAt: monthStart.date(5),
    endAt: monthStart.date(7).endOf('day'),
    type: 'warning',
    clickable: true,
  },
  {
    title: 'QA review',
    startAt: monthStart.date(12),
    endAt: monthStart.date(13).endOf('day'),
    type: 'success',
    clickable: true,
  },
  {
    title: 'Launch',
    startAt: monthStart.date(22).hour(9),
    type: 'error',
    clickable: true,
  },
]);

function onFlagClick(flag: HCalendarPinFlag) {
  status.value = `Selected ${String(flag.title ?? 'milestone')}`;
}

function onCreatingPinFlag(date: Dayjs) {
  status.value = `Creating from ${date.format('MMM D')}`;
  return { title: 'New milestone', type: 'pill' as const };
}

async function onCreateFinished(flag: HCalendarPinFlag) {
  if (finishBehavior.value === 'Discard') {
    status.value = 'Milestone discarded';
    return false;
  }

  if (finishBehavior.value === 'Rename') {
    status.value = 'Milestone renamed';
    return { ...flag, title: 'Follow-up' };
  }

  status.value = 'Milestone kept';
  return true;
}
</script>

<template>
  <div class="calendar-flags-demo">
    <label class="calendar-flags-demo-option">
      <span>After creation</span>
      <h-segmented v-model:active-key="finishBehavior" size="small">
        <h-segmented-item key="Discard" label="Discard" />
        <h-segmented-item key="Keep" label="Keep" />
        <h-segmented-item key="Rename" label="Rename" />
      </h-segmented>
    </label>
    <p aria-live="polite">{{ status }}</p>

    <div class="calendar-flags-demo-viewport">
      <h-calendar
        v-model="currentDate"
        v-model:pin-flags="pinFlags"
        mode="month"
        pin-flags-show-time
        enable-create-pin-flags
        :creating-pin-flag-callback="onCreatingPinFlag"
        :creat-finish-flag-callback="onCreateFinished"
        @pin-flag-click="onFlagClick"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar-flags-demo {
  display: grid;
  gap: var(--h-spacing-3);
  min-width: 0;
}

.calendar-flags-demo-option {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
  align-items: center;
}

.calendar-flags-demo-option span,
.calendar-flags-demo p {
  margin: 0;
  font-size: var(--h-text-sm);
  color: var(--h-text-secondary);
}

.calendar-flags-demo-viewport {
  min-width: 0;
  height: min(76vh, 680px);
  min-height: 580px;
  overflow: auto;
}

@media (width <= 520px) {
  .calendar-flags-demo-viewport {
    height: 540px;
    min-height: 0;
  }
}
</style>
