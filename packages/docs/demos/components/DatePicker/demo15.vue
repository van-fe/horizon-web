<template>
  <div class="demo-wrapper">
    <div class="box"><span>日期时间范围(单列时间)</span>
      <NDatePicker v-model="time1" type="datetimerange"></NDatePicker>
    </div>
    <div class="box"><span>日期时间范围(双列时间)</span>
      <NDatePicker v-model="time2" type="dateminutesrange"></NDatePicker>
    </div>
    <div class="box"><span>日期时间范围(三列时间)</span>
      <NDatePicker v-model="time3" type="datesecondsrange"></NDatePicker>
    </div>
    <div class="box"><span>默认开始时刻和结束时刻</span>
      <NDatePicker v-model="time4" type="datesecondsrange" :default-time="defaultTime"></NDatePicker>
    </div>
    <div class="box"><span>日期时间范围(带快捷项)</span>
      <NDatePicker v-model="time5" type="datesecondsrange" :shortcuts="shortcuts"></NDatePicker>
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
    let time5 = ref();
    let defaultTime = ref(['12:00:00', '08:00:00']);

    let shortcuts = ref([
      {
        label: 'Last week',
        value: () => {
          const start = new Date();
          const end = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

          return [start, end];
        },
      },
      {
        label: 'Last month',
        value: () => {
          const start = new Date();
          const end = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          return [start, end];
        },
      },
      {
        label: 'Last 3 months',
        value: () => {
          const start = new Date();
          const end = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          return [start, end];
        },
      }]);

    return {
      time1,
      time2,
      time3,
      time4,
      time5,
      defaultTime,
      shortcuts,
    };
  },
});
</script>
<style lang="scss" scoped>
.demo-wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .box {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }
}
</style>
