<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>年</span>
      <n-date-picker v-model="time1" type="year" />
    </div>
    <div class="box">
      <span>月</span>
      <n-date-picker v-model="time2" type="month" />
    </div>
    <div class="box">
      <span>周</span>
      <n-date-picker v-model="time3" type="week" format="[Week] ww" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let time1 = ref(new Date());
    let time2 = ref(new Date());
    let time3 = ref(new Date());

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
