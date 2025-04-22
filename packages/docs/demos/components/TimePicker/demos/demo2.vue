<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>两列禁选范围09:30-12:30</span>
      <n-time-picker
        v-model="time1"
        type="minutes"
        value-format="HH:mm"
        :disabled-time="disabledTime1"
      />
    </div>
    <div class="box">
      <span>三列禁选范围08:30:30-18:30:30</span>
      <n-time-picker
        v-model="time2"
        type="seconds"
        value-format="HH:mm:ss"
        :disabled-time="disabledTime2"
      />
    </div>
    <div class="box">
      <span>时间范围禁选（08:30:30以前和21:30:30以后）</span>
      <n-time-picker
        v-model="time3"
        type="seconds"
        value-format="HH:mm:ss"
        is-range
        :disabled-time="disabledTime3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const time1 = ref('03:10');
    const time2 = ref('08:00:00');
    const time3 = ref(['09:00:00', '12:00:00']);

    function disabledTime1({ hours, minutes }) {
      if (hours >= 10 && hours < 12) {
        return true;
      }
      if (hours === 9 && minutes >= 30) {
        return true;
      }
      if (hours === 12 && minutes <= 30) {
        return true;
      }
      return false;
    }

    function disabledTime2({ hours, minutes, seconds }) {
      if (hours >= 9 && hours < 18) {
        return true;
      }
      if ((hours === 8 && minutes > 30) || (hours === 8 && minutes === 30 && seconds >= 30)) {
        return true;
      }
      if ((hours === 18 && minutes < 30) || (hours === 18 && minutes === 30 && seconds <= 30)) {
        return true;
      }
      return false;
    }

    function disabledTime3({ hours, minutes, seconds }, placement) {
      if (hours < 8 || hours > 21) {
        return true;
      }
      if ((hours === 8 && minutes < 30) || (hours === 8 && minutes === 30 && seconds < 30)) {
        return true;
      }
      if ((hours === 21 && minutes > 30) || (hours === 21 && minutes === 30 && seconds > 30)) {
        return true;
      }
      return false;
    }

    return {
      time1,
      time2,
      time3,
      disabledTime1,
      disabledTime2,
      disabledTime3,
    };
  },
});
</script>

<style>
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
