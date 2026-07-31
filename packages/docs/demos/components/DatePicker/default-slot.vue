<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-date-picker v-model="value" type="date" :to-body="false">
        <template #default="{ grid }">
          <div :class="{'custom-grid': true, 'is-selected': grid.isSelected ,'is-holiday': ([0, 6].includes(grid.date.day()) && !isInWorkday(grid.date)) || isInHoliday(grid.date)}">
            {{ grid.text }}
            <div v-if="isInHoliday(grid.date)" class="badge holiday">休</div>
            <div v-if="isInWorkday(grid.date)" class="badge workday">班</div>
          </div>
        </template>
      </h-date-picker>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref();

const holiday2025 = [
  '2025/01/01',
  '2025/01/28', '2025/01/29', '2025/01/30', '2025/01/31', '2025/02/01', '2025/02/02', '2025/02/03', '2025/02/04',
  '2025/04/04', '2025/04/05', '2025/04/06',
  '2025/05/01', '2025/05/02', '2025/05/03', '2025/05/04', '2025/05/05',
  '2025/05/31', '2025/06/01', '2025/06/02',
  '2025/10/01', '2025/10/02', '2025/10/03', '2025/10/04', '2025/10/05', '2025/10/06', '2025/10/07', '2025/10/08',
];

const workday2025 = [
  '2025/01/26', '2025/02/08',
  '2025/04/27',
  '2025/09/28', '2025/10/11',
];

const isInHoliday = (date: Dayjs) => holiday2025.includes(date.format('YYYY/MM/DD'));
const isInWorkday = (date: Dayjs) => workday2025.includes(date.format('YYYY/MM/DD'));

</script>

<style>
.custom-grid {
  width: 50px;
  height: 50px;
  display: flex;
  aligh-items: center;
  justify-content: center;
  border: 1px solid var(--h-divider-default);
  position: relative;
  cursor: pointer;
  transition: var(--h-transition-color-behavior);



  &.is-holiday {
    color: var(--h-text-secondary);
    background-color: var(--h-bg-secondary);
  }

  &.is-selected {
    color: var(--h-text-inverse);
    background-color: var(--h-bg-brand-activated);

    &:hover {
      background-color: var(--h-bg-brand-hover);
    }

    .badge {
      &.holiday {
        color: var(--h-text-inverse);
      }

      &.workday {
        color: var(--h-text-inverse);
      }
    }
  }

  &:not(.is-selected) {
    &:hover {
      background-color: var(--h-bg-weak-hover);
    }

    .badge {
      &.holiday {
        color: var(--h-text-success-default);
      }

      &.workday {
        color: var(--h-text-warning-default);
      }
    }
  }

  .badge {
    font-size: 12px;
    position: absolute;
    top: 0;
    right: 2px;
    transform: scale(.9);
  }
}
</style>