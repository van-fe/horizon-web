<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>默认情况</span>
      <span>value: {{ time1 }}</span>
      <n-date-picker v-model="time1" type="date"></n-date-picker>
    </div>
    <div class="box">
      <span>使用 valueFormat</span>
      <span>value: {{ time2 }}</span>
      <n-date-picker
        v-model="time2"
        type="date"
        format="YYYY年MM月DD日"
        value-format="YYYY/MM/DD"
      ></n-date-picker>
    </div>
    <div class="box">
      <span>使用 valueFormat(毫秒)</span>
      <span>value: {{ time3 }}</span>
      <n-date-picker
        v-model="time3"
        type="dateseconds"
        format="YYYY年MM月DD日 HH时mm分ss秒"
        value-format="timestamp"
      ></n-date-picker>
    </div>
    <div class="box">
      <span>使用 valueFormat(秒)</span>
      <span>value: {{ time4 }}</span>
      <n-date-picker
        v-model="time4"
        type="dateseconds"
        value-format="X"
      ></n-date-picker>
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
    

    return {
      time1,
      time2,
      time3,
      time4,
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
