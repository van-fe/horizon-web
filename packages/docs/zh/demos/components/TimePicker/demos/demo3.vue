<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>两列（间隔连续）</span>
      <h-time-picker v-model="time1" type="minutes" :picker-options="pickerOptions1" />
    </div>
    <div class="box">
      <span>三列（间隔连续）</span>
      <h-time-picker v-model="time2" type="seconds" :picker-options="pickerOptions2" />
    </div>
    <div class="box">
      <span>两列（间隔不连续）</span>
      <h-time-picker v-model="time3" type="minutes" :picker-options="pickerOptions3" />
    </div>
    <div class="box">
      <span>三列（间隔不连续）</span>
      <h-time-picker v-model="time4" type="seconds" :picker-options="pickerOptions3" />
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
    const time4 = ref();

    const pickerOptions1 = {
      minutesStep: 5,
    };
    const pickerOptions2 = {
      minutesStep: 5,
      secondsStep: 10,
    };
    const pickerOptions3 = {
      selectableHours: ['7', '9-12', 14, '15-18', '23', '0-3'],
      selectableMinutes: ['9', '11-19', 30, '31-49', 50],
      selectableSeconds: ['9', '11-19', 30, '31-49', 50],
    };

    return {
      time1,
      time2,
      time3,
      time4,
      pickerOptions1,
      pickerOptions2,
      pickerOptions3,
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
