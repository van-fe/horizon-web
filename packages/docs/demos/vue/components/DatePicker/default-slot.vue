<script setup lang="ts">
import { computed, ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const selectedDate = ref(dayjs().date(14));
const releaseDates = [dayjs().date(7), dayjs().date(14), dayjs().date(21)].map(date =>
  date.format('YYYY-MM-DD'),
);
const maintenanceDate = dayjs().date(18).format('YYYY-MM-DD');
const selectionLabel = computed(() => selectedDate.value.format('YYYY-MM-DD'));

function isReleaseDate(date: Dayjs) {
  return releaseDates.includes(date.format('YYYY-MM-DD'));
}

function isMaintenanceDate(date: Dayjs) {
  return date.format('YYYY-MM-DD') === maintenanceDate;
}
</script>

<template>
  <section class="date-picker-slot">
    <h-date-picker v-model="selectedDate" type="date" :to-body="false">
      <template #default="{ grid }">
        <div
          class="release-date-cell"
          :class="{
            'is-selected': grid.isSelected,
            'has-release': isReleaseDate(grid.date),
            'has-maintenance': isMaintenanceDate(grid.date),
          }"
        >
          <span>{{ grid.text }}</span>
          <small v-if="isReleaseDate(grid.date)">R</small>
          <small v-else-if="isMaintenanceDate(grid.date)">M</small>
        </div>
      </template>
    </h-date-picker>
    <p aria-live="polite">{{ selectionLabel }} · R release · M maintenance</p>
  </section>
</template>

<style scoped>
.date-picker-slot {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-slot p {
  margin: 0;
  color: var(--h-text-secondary);
}

.release-date-cell {
  position: relative;
  display: grid;
  place-items: center;
  inline-size: 100%;
  block-size: 100%;
  border-radius: var(--h-radius-m);
  color: var(--h-text-primary);
}

.release-date-cell:hover {
  background: var(--h-bg-weak-hover);
}

.release-date-cell.is-selected {
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-activated);
}

.release-date-cell small {
  position: absolute;
  inset-block-start: 1px;
  inset-inline-end: 2px;
  color: var(--h-text-brand-default);
  font-size: 9px;
  font-weight: var(--h-weight-strong);
  line-height: 1;
}

.release-date-cell.has-maintenance small {
  color: var(--h-text-warning-default);
}

.release-date-cell.is-selected small {
  color: var(--h-text-inverse);
}

@media (max-width: 390px) {
  .date-picker-slot {
    inline-size: 100%;
  }
}
</style>
