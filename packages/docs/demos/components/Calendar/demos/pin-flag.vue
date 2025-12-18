<template>
  <div class="wrapper">
    <n-form label-position="left" label-vertical-align="middle" label-width="150px">
      <n-form-item label="Reserve Event">
        <n-radio-group v-model="reserveEvent">
          <n-radio :label="1">Don't reserve</n-radio>
          <n-radio :label="2">Reserve original</n-radio>
          <n-radio :label="3">Reserve and modify</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Date Type">
        <n-radio-group v-model="dateType">
          <n-radio label="full">Full</n-radio>
          <n-radio label="only-current">Only Current</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Pin Flags Show Time">
        <n-radio-group v-model="showTime">
          <n-radio :label="true">Yes</n-radio>
          <n-radio :label="false">No</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Create Flag Can Though Disable Date Or Hour">
        <n-radio-group v-model="createFlagCanThoughDisableDateOrHour">
          <n-radio :label="true">Yes</n-radio>
          <n-radio :label="false">No</n-radio>
        </n-radio-group>
      </n-form-item>
    </n-form>
    <n-calendar
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
import { NCalendarPinFlag } from '@aurora/horizon-web';
import { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const reserveEvent = ref(1);
    const dateType = ref('full');
    const showTime = ref(true);
    const createFlagCanThoughDisableDateOrHour = ref(true);

    const pinFlags = ref<NCalendarPinFlag[]>([
      {
        title: 'NIO车展',
        startAt: '2022-10-14',
        endAt: '2022-10-20 23:59:59',
        tooltip: 'NIO车展，千万不要错过',
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

    function onFlagClick(flag: NCalendarPinFlag) {
      console.log(flag);
    }

    function onCreatingPinFlagCallback(date: Dayjs) {
      console.log(date.format('YYYY-MM-DD'));

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

.wrapper .n-calendar {
  flex: 1;
}
</style>
