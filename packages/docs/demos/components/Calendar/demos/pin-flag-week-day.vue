<template>
  <div class="wrapper">
    <h-form label-position="left" label-vertical-align="middle" label-width="200px">
      <h-form-item label="Enable Create Pin Flags">
        <h-radio-group v-model="enableCreatePinFlags">
          <h-radio :label="true">True</h-radio>
          <h-radio :label="false">False</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Reserve Event">
        <h-radio-group v-model="reserveEvent">
          <h-radio :label="1">Don't reserve</h-radio>
          <h-radio :label="2">Reserve original</h-radio>
          <h-radio :label="3">Reserve and modify</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Show Spacing Between Flags">
        <h-radio-group v-model="showSpacingBetweenFlags">
          <h-radio :label="true">True</h-radio>
          <h-radio :label="false">False</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Create Flag Can Though Disable Date Or Hour">
        <h-radio-group v-model="createFlagCanThoughDisableDateOrHour">
          <h-radio :label="true">Yes</h-radio>
          <h-radio :label="false">No</h-radio>
        </h-radio-group>
      </h-form-item>
    </h-form>
    <h-calendar
      v-model:pin-flags="pinFlags"
      :pickable="true"
      mode="week"
      :mode-switchable="true"
      :mode-switchable-list="['week', 'day']"
      :enable-create-pin-flags="enableCreatePinFlags"
      :pin-flags-show-time="true"
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
    </h-calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NCalendarPinFlag } from '@aurora/horizon-web';
import dayjs, { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const reserveEvent = ref(1);
    const enableCreatePinFlags = ref(true);
    const showSpacingBetweenFlags = ref(true);
    const createFlagCanThoughDisableDateOrHour = ref(true);
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
      console.info(flag);
    }

    function onCreatingPinFlagCallback(date: Dayjs) {
      console.info(date.format('YYYY-MM-DD HH:mm'));

      return {
        title: 'New Event',
        type: 'pill',
      };
    }

    function onCreatFinishFlagCallback(flag: NCalendarPinFlag) {
      return new Promise(resolve => {
        console.info(flag);

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

    return {
      reserveEvent,
      enableCreatePinFlags,
      showSpacingBetweenFlags,
      createFlagCanThoughDisableDateOrHour,
      pinFlags,
      onFlagClick,
      onCreatingPinFlagCallback,
      onCreatFinishFlagCallback,
      disableHours(date: Dayjs) {
        if ([0, 6].includes(Number(date.format('d')))) {
          return [[date, date.endOf('d')]];
        } else if (date.isSame(dayjs().startOf('d'))) {
          return [[date, date.add(8, 'h')], [date.add(10, 'h'), date.add(12, 'h').add(20, 'm')], [date.add(20, 'h'), date.endOf('d')]];
        } else {
          return [[date, date.add(8, 'h')], [date.add(20, 'h'), date.endOf('d')]];
        }
      },
    };
  },
});
</script>

<style scoped>
.wrapper {
  max-height: 1000px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.wrapper .h-calendar {
  flex: 1;
}
</style>
