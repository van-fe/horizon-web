<template>
  <div class="demo-wrapper">
    <div class="box"><span>默认日期范围 - (2个触发器 + 2个面板)</span>
      <NDatePicker v-model="time1" type="daterange"></NDatePicker>
    </div>
    <div class="box"><span>日期范围 - (2个触发器 + 1个面板)</span>
      <NDatePicker v-model="time2" type="daterange" :panel-number="1"></NDatePicker>
    </div>
    <div class="box"><span>日期范围 - (1个触发器 + 1个面板)</span>
      <NDatePicker v-model="time3" type="daterange" :trigger-number="1" :panel-number="1"></NDatePicker>
    </div>
    <div class="box"><span>日期范围 - (1个触发器 + 2个面板)</span>
      <NDatePicker v-model="time4" type="daterange" :trigger-number="1"></NDatePicker>
    </div>
    <div class="box"><span>单月模式 - 月份范围</span>
      <NDatePicker v-model="time5" type="monthrange" :panel-number="1"></NDatePicker>
    </div>
    <div class="box"><span>双月模式 - 月份范围</span>
      <NDatePicker v-model="time6" type="monthrange"></NDatePicker>
    </div>
    <div class="box"><span>年份范围</span>
      <NDatePicker v-model="time7" type="yearrange"></NDatePicker>
    </div>
    <div class="box"><span>月份范围-解除两个面板联动</span>
      <NDatePicker v-model="time8" type="daterange" :unlink-panels="true"></NDatePicker>
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
    let time6 = ref();
    let time7 = ref();
    let time8 = ref();

    return {
      time1,
      time2,
      time3,
      time4,
      time5,
      time6,
      time7,
      time8,
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
