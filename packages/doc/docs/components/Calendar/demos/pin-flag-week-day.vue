<template>
  <div class="wrapper">
    <n-form label-position="left" label-vertical-align="middle" label-width="200px">
      <n-form-item label="Enable Create Pin Flags">
        <n-radio-group v-model="enableCreatePinFlags">
          <n-radio :label="true">True</n-radio>
          <n-radio :label="false">False</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Reserve Event">
        <n-radio-group v-model="reserveEvent">
          <n-radio :label="1">Don't reserve</n-radio>
          <n-radio :label="2">Reserve original</n-radio>
          <n-radio :label="3">Reserve and modify</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Show Spacing Between Flags">
        <n-radio-group v-model="showSpacingBetweenFlags">
          <n-radio :label="true">True</n-radio>
          <n-radio :label="false">False</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Create Flag Can Though Disable Date Or Hour">
        <n-radio-group v-model="createFlagCanThoughDisableDateOrHour">
          <n-radio :label="true">Yes</n-radio>
          <n-radio :label="false">No</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Hour Format">
        <n-radio-group v-model="hourFormat">
          <n-radio label="12">12</n-radio>
          <n-radio label="24">24</n-radio>
        </n-radio-group>
      </n-form-item>
    </n-form>
    <n-calendar
      v-model:pin-flags="pinFlags"
      :pickable="true"
      mode="week"
      :mode-switchable="true"
      :mode-switchable-list="['week', 'day']"
      :enable-create-pin-flags="enableCreatePinFlags"
      :pin-flags-show-time="true"
      :hour-format="hourFormat"
      :creating-pin-flag-callback="onCreatingPinFlagCallback"
      :creat-finish-flag-callback="onCreatFinishFlagCallback"
      :create-flag-can-though-disable-date-or-hour="createFlagCanThoughDisableDateOrHour"
      :show-spacing-between-flags="showSpacingBetweenFlags"
      :disable-hours="disableHours"
      @pinFlagClick="onFlagClick"
    >
      <template #dayHeader="dayStr, dayObj, isToday">
        {{ dayStr }} {{ dayObj.format('dddd') }} {{ isToday ? 'Today' : '' }}
      </template>
    </n-calendar>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { NCalendarPinFlag } from '@nio-fe/lego';
import dayjs, { Dayjs } from 'dayjs';

const reserveEvent = ref(1);
const enableCreatePinFlags = ref(true);
const showSpacingBetweenFlags = ref(true);
const createFlagCanThoughDisableDateOrHour = ref(true);
const hourFormat = ref('12');
const weekStart = dayjs().startOf('week');

const pinFlags = ref<NCalendarPinFlag[]>([
  {
    startAt: weekStart.day(1).hour(8),
    endAt: weekStart.day(1).hour(9),
    type: 'success',
    clickable: true,
  },
  {
    title: '会议',
    startAt: weekStart.day(1).hour(9),
    endAt: weekStart.day(1).hour(10).minute(30),
    type: 'info',
  },
  {
    startAt: weekStart.day(1).hour(10).minute(30),
    endAt: weekStart.day(1).hour(14),
    type: 'warning',
  },
  {
    startAt: weekStart.day(3).hour(9),
    endAt: weekStart.day(4).hour(6),
    type: 'success',
  },
  {
    title: 'On Leave',
    startAt: weekStart.day(5).hour(8),
    endAt: weekStart.day(5).hour(15),
    type: 'error',
  },
]);

function onFlagClick(flag: NCalendarPinFlag) {
  console.log(flag);
}

function onCreatingPinFlagCallback(date: Dayjs) {
  console.log(date.format('YYYY-MM-DD HH:mm'));

  return {
    title: 'New Event',
    type: 'pill',
  };
}

function onCreatFinishFlagCallback(flag: NCalendarPinFlag) {
  return new Promise(resolve => {
    console.log(flag);

    switch (reserveEvent.value) {
      case 1:
        resolve(false);
        break;
      case 2:
        resolve(true);
        break;
      case 3:
        flag.title = 'Created Flag';
        resolve(flag);
        break;
    }
  });
}

function disableHours(date: Dayjs) {
  if ([0, 6].includes(Number(date.format('d')))) {
    return [[date, date.endOf('d')]];
  } else if (date.isSame(dayjs().startOf('d'))) {
    return [[date, date.add(8, 'h')], [date.add(10, 'h'), date.add(12, 'h').add(20, 'm')], [date.add(20, 'h'), date.endOf('d')]];
  } else {
    return [[date, date.add(8, 'h')], [date.add(20, 'h'), date.endOf('d')]];
  }
}
</script>

<style scoped>
.wrapper {
  max-height: 1000px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.wrapper .n-calendar {
  flex: 1;
}
</style>
