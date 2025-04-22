<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>default picker value</span>
      <n-date-picker
        v-model="time1"
        type="date"
        :default-picker-value="defaultPickerValue"
      ></n-date-picker>
    </div>
    <div class="box">
      <span>default time</span>
      <n-date-picker v-model="time2" type="dateseconds" :default-time="defaultTime"></n-date-picker>
    </div>
    <div class="box">
      <span>default time (type = daterange)</span>
      <span>value: {{ time3 }}</span>
      <n-date-picker v-model="time3" type="daterange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime1"></n-date-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const time1 = ref();
    const time2 = ref();
    const time3 = ref();
    const defaultPickerValue = ref(new Date(2022, 1, 1, 12, 0, 0));
    const defaultTime = ref('12:00:00');
    const defaultTime1 = ref(['09:00:00', '23:59:59']);

    return {
      time1,
      time2,
      time3,
      defaultPickerValue,
      defaultTime,
      defaultTime1,
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
