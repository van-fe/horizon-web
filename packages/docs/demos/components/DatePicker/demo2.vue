<template>
  <div class="demo-wrapper">
    <div class="box"><span>单月 + 单列时间选择</span>
      <NDatePicker v-model="time1" type="datetime" :picker-options="pickerOptions1"></NDatePicker>
    </div>
    <div class="box"><span>单月 + 双列时间选择</span>
      <NDatePicker v-model="time2" type="dateminutes" :picker-options="pickerOptions2"></NDatePicker>
    </div>
    <div class="box"><span>单月 + 三列时间选择</span>
      <NDatePicker v-model="time3" type="dateseconds" :picker-options="pickerOptions3"></NDatePicker>
    </div>
    <div class="box"><span>单月 + 三列时间选择(快捷项)</span>
      <NDatePicker v-model="time4" type="dateseconds" :shortcuts="shortcuts"></NDatePicker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let time1 = ref();
    let time2 = ref();
    let time3 = ref();
    let time4 = ref();

    const pickerOptions1 = {
      start: '00:00',
      step: '00:10',
      end: '23:50',
    };
    const pickerOptions2 = {
      minutesStep: 5,
    };
    const pickerOptions3 = {
      minutesStep: 10,
      secondsStep: 10,
    };
    let shortcuts = ref([
      {
        label: 'Yesterday',
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 1);
          return date;
        },
      },
      {
        label: 'Today',
        value: () => new Date(),
      },
      {
        label: 'Last 7 days',
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      }]);

    return {
      time1,
      time2,
      time3,
      time4,
      pickerOptions1,
      pickerOptions2,
      pickerOptions3,
      shortcuts,
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
