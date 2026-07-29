<template>
  <div class="wrapper">
    <h-form label-position="left" label-vertical-align="middle" label-width="150px">
      <h-form-item label="Reserve Event">
        <h-radio-group v-model="reserveEvent">
          <h-radio :label="1">Don't reserve</h-radio>
          <h-radio :label="2">Reserve original</h-radio>
          <h-radio :label="3">Reserve and modify</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Date Type">
        <h-radio-group v-model="dateType">
          <h-radio label="full">Full</h-radio>
          <h-radio label="only-current">Only Current</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Pin Flags Show Time">
        <h-radio-group v-model="showTime">
          <h-radio :label="true">Yes</h-radio>
          <h-radio :label="false">No</h-radio>
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
      model-value="2022-10-10"
      :date-type="dateType"
      :pickable="true"
      mode="month"
      :pin-flags-show-time="showTime"
      :mode-switchable="true"
      :mode-switchable-list="['year', 'month']"
      :enable-create-pin-flags="true"
      :disable-date="disableDate"
      :create-flag-can-though-disable-date-or-hour="createFlagCanThoughDisableDateOrHour"
      :creating-pin-flag-callback="onCreatingPinFlagCallback"
      :creat-finish-flag-callback="onCreatFinishFlagCallback"
      @pinFlagClick="onFlagClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue';
import { HCalendarPinFlag } from '@aurora/horizon-web';
import { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const reserveEvent = ref(1);
    const dateType = ref('full');
    const showTime = ref(true);
    const createFlagCanThoughDisableDateOrHour = ref(true);

    const pinFlags = ref<HCalendarPinFlag[]>([
      {
        title: 'Demo车展',
        startAt: '2022-10-14',
        endAt: '2022-10-20 23:59:59',
        tooltip: 'Demo车展，千万不要错过',
        clickable: true,
      },
      {
        title: '车主面对面',
        startAt: '2022-10-17',
        endAt: '2022-10-19 23:59:59',
        tooltip: '车主面对面，直面心灵的碰撞',
        type: 'warning',
      },
      {
        title: '国庆节',
        startAt: '2022-10-1',
        endAt: '2022-10-8',
        type: 'success',
      },
      {
        title: 'WAD团建',
        startAt: '2022-10-21',
        type: 'success',
      },
      {
        title: '自驾游',
        startAt: '2022-10-22',
        endAt: '2022-10-24',
        type: 'warning',
      },
      {
        title: '桌游聚会',
        startAt: '2022-10-22 12:00',
        type: 'default',
      },
      {
        title: h('span', '请假'),
        startAt: '2022-10-12 00:00',
        endAt: '2022-10-12 12:00',
        type: 'error',
        tooltip: true,
      },
      {
        title: '室内游',
        startAt: '2022-10-22 10:00',
        endAt: '2022-10-23 18:00',
        type: 'success',
        color: 'dodgerblue',
        background: 'skyblue',
      },
    ]);

    function onFlagClick(flag: HCalendarPinFlag) {
      console.info(flag);
    }

    function onCreatingPinFlagCallback(date: Dayjs) {
      console.info(date.format('YYYY-MM-DD'));

      return {
        title: 'New Event',
        type: 'pill',
      };
    }

    function onCreatFinishFlagCallback(flag: HCalendarPinFlag) {
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
      dateType,
      reserveEvent,
      pinFlags,
      showTime,
      createFlagCanThoughDisableDateOrHour,
      disableDate(date: Dayjs) {
        return [0, 6].includes(date.day());
      },
      onFlagClick,
      onCreatingPinFlagCallback,
      onCreatFinishFlagCallback,
    };
  },
});
</script>

<style scoped>
.wrapper {
  max-height: 1200px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.wrapper .h-calendar {
  flex: 1;
}
</style>
