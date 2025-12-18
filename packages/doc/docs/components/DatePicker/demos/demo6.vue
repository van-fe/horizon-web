<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>2022/05/21之前的时间禁选</span>
      <n-date-picker
        v-model="time1"
        type="date"
        :disabled-date="disabledDate"
        :show-footer="true"
      ></n-date-picker>
    </div>
    <div class="box">
      <span>2022/05/21之前的日期禁选，09:30-18:30范围禁选</span>
      <n-date-picker
        v-model="time2"
        type="dateseconds"
        :disabled-date="disabledDate"
        :disabled-time="disabledTime"
      ></n-date-picker>
    </div>
    <div class="box">
      <span>2022/05/21 09:30:00之前的时间禁选</span>
      <n-date-picker
        v-model="time3"
        type="dateseconds"
        :disabled-date="disabledDate3"
        :disabled-time="disabledTime3"
      ></n-date-picker>
    </div>
    <div class="box">
      <span>时间范围选择限制15天</span>
      <n-date-picker
        v-model="time4"
        type="daterange"
        :disabled-date="disabledDate4"
        @pick="pick"
      ></n-date-picker>
    </div>
    <div class="box">
      <span>2022/05/21之前的时间禁选(disabledSwitchButton模式)</span>
      <n-date-picker
        v-model="time5"
        type="date"
        :disabled-date="disabledDate"
        :disabled-switch-button="true"
        @pick="pick"
      ></n-date-picker>
    </div>
    <div class="box">
      <span>日期时间范围禁选（今天之前的日期禁选，09:30-18:30范围禁选）</span>
      <n-date-picker
        v-model="time6"
        type="datesecondsrange"
        :disabled-date="disabledDate6"
        :begin-disabled-time="disabledTime6"
        :end-disabled-time="disabledTime6"
      ></n-date-picker>
    </div>
    <div class="box">
      <span>日期时间范围禁选（当前时间之前不可选择）</span>
      <n-date-picker
        v-model="time7"
        type="datesecondsrange"
        :disabled-date="disabledDate7"
        :begin-disabled-time="beginDisabledTime7"
        :end-disabled-time="beginDisabledTime7"
      ></n-date-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let time1 = ref('2022/05/22');
    let time2 = ref('2022/05/22 00:00:00');
    let time3 = ref('2022/05/22 00:00:00');
    let time4 = ref();
    let time5 = ref('2022/05/22');
    let time6 = ref();
    let time7 = ref();
    const currentPick = ref();

    function disabledDate(date: Date) {
      return date.getTime() < new Date('2022/05/21').getTime();
    }
    function disabledTime({ hours, minutes }: { hours: number; minutes: number }) {
      if (hours >= 10 && hours < 18) {
        return true;
      }
      if (hours === 9 && minutes >= 30) {
        return true;
      }
      if (hours === 18 && minutes <= 30) {
        return true;
      }
    }
    function disabledDate3(date: Date) {
      return date.getTime() < new Date('2022/05/21').getTime();
    }
    function disabledTime3({ years, months, date, hours, minutes }: { years: number; months: number; date: number; hours: number; minutes: number }) {
      if (years <= 2022 && months <= 4 && date <= 20) {
        return true;
      }
      if (years === 2022 && months === 4 && date === 21) {
        if (hours < 9) {
          return true;
        }
        if (hours === 9 && minutes < 30) {
          return true;
        }
      }
      return false;
    }
    function disabledDate6(date: Date) {
      return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
    }
    function disabledTime6({ hours, minutes }: { hours: number; minutes: number }) {
      if (hours <= 8 || hours > 18) {
        return true;
      }
      if (hours === 9 && minutes < 30) {
        return true;
      }
      if (hours === 18 && minutes > 30) {
        return true;
      }
    }
    function pick(list: any[]) {
      currentPick.value = list[0];
    }
    function disabledDate4(date: Date) {
      if (currentPick.value) {
        const current = new Date(
          currentPick.value.years,
          currentPick.value.months,
          currentPick.value.date,
        );
        return (
          date.getTime() < new Date(current.getTime() - 15 * 24 * 60 * 60 * 1000).getTime() ||
          date.getTime() > new Date(current.getTime() + 15 * 24 * 60 * 60 * 1000).getTime()
        );
      }
      return false;
    }
    function disabledDate7(date: Date) {
      return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
    }
    function beginDisabledTime7({ years, months, date,  hours, minutes }: { years: number; months: number; date: number; hours: number; minutes: number }) {
      const currentDate = new Date();

      if (years <= currentDate.getFullYear() && months <= currentDate.getMonth() && date <= currentDate.getDate()) {
        if (hours < currentDate.getHours()) {
          return true;
        }
        if (hours === currentDate.getHours() && minutes < currentDate.getMinutes()) {
          return true;
        }
      }
      return false;
    }
    function endDisabledTime7({ years, months, date,  hours, minutes }: { years: number; months: number; date: number; hours: number; minutes: number }) {
      const currentDate = new Date();

      if (years <= currentDate.getFullYear() && months <= currentDate.getMonth() && date <= currentDate.getDate()) {
        if (hours < currentDate.getHours()) {
          return true;
        }
        if (hours === currentDate.getHours() && minutes < currentDate.getMinutes()) {
          return true;
        }
      }
      return false;
    }

    return {
      time1,
      time2,
      time3,
      time4,
      time5,
      time6,
      time7,
      disabledDate,
      disabledTime,
      disabledDate3,
      disabledTime3,
      disabledDate6,
      disabledTime6,
      disabledDate4,
      disabledDate7,
      beginDisabledTime7,
      endDisabledTime7,
      pick,
    };
  },
});
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.demo-wrapper .box {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
</style>
