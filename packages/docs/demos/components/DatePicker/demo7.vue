<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>单月 + 单列时间</span>
      <h-date-picker
        v-model="time1"
        type="datetime"
        :show-date-tooltip="showDateTooltip"
      ></h-date-picker>
    </div>
    <div class="box">
      <span>单月 + 双列时间</span>
      <h-date-picker
        v-model="time2"
        type="dateminutes"
        :show-date-tooltip="showDateTooltip"
        :show-time-tooltip="showTimeTooltip"
      ></h-date-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let time1 = ref(new Date(2022, 8, 1, 12, 0, 0));
    let time2 = ref(new Date(2022, 8, 1, 12, 0, 0));

    function showDateTooltip(date: Date) {
      return {
        show:
          date.getTime() > new Date(2022, 8, 10).getTime() &&
          date.getTime() < new Date(2022, 8, 20).getTime(),
        content: `${date}`,
      };
    }
    function showTimeTooltip({ hours, minutes }) {
      return {
        show: hours >= 10 && hours <= 12,
        content: `${hours}-${minutes}`,
      };
    }

    return {
      time1,
      time2,
      showDateTooltip,
      showTimeTooltip,
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
