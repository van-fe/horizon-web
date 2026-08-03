<script setup lang="ts">
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');
const actionList = [
  { time: '09:00', text: 'Release check' },
  { time: '13:00', text: 'Accessibility QA' },
  { time: '15:30', text: 'Publish notes' },
];
</script>

<template>
  <div class="calendar-cell-demo-viewport">
    <h-calendar auto-fit>
      <template #dateCellAppend="dateFormat">
        <h-popover v-if="today === dateFormat" placement="bottom-start" :arrow="false">
          <template #reference>
            <h-button text size="small">{{ actionList.length }} events</h-button>
          </template>
          <template #popper>
            <h-pop-content class="calendar-cell-demo-events">
              <span v-for="item in actionList" :key="item.time">
                {{ item.time }} · {{ item.text }}
              </span>
            </h-pop-content>
          </template>
        </h-popover>
      </template>
    </h-calendar>
  </div>
</template>

<style scoped>
.calendar-cell-demo-viewport {
  min-width: 0;
  height: min(72vh, 640px);
  min-height: 540px;
  overflow: auto;
}

.calendar-cell-demo-events {
  display: grid;
  gap: var(--h-spacing-2);
  width: min(72vw, 240px);
  padding: var(--h-spacing-3);
  font-size: var(--h-text-sm);
}

@media (width <= 520px) {
  .calendar-cell-demo-viewport {
    height: 520px;
    min-height: 0;
  }
}
</style>
