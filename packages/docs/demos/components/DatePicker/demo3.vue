<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>默认不显示前后月日期</span>
      <h-date-picker v-model="time1" type="date"></h-date-picker>
    </div>
    <div class="box">
      <span>显示前后月日期</span>
      <h-date-picker v-model="time2" type="date" :show-before-after-date="true"></h-date-picker>
    </div>
    <div class="box">
      <span>固定显示6行日期（默认不固定行数）</span>
      <h-date-picker v-model="time3" type="date" :fixed-six-rows="true"></h-date-picker>
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

    return {
      time1,
      time2,
      time3,
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
