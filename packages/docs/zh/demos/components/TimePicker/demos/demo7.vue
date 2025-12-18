<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>单列</span>
      <n-time-picker v-model="time1" type="time" is-range  />
    </div>
    <div class="box">
      <span>两列</span>
      <n-time-picker v-model="time2" type="minutes" is-range />
    </div>
    <div class="box">
      <span>三列</span>
      <n-time-picker v-model="time3" type="seconds" is-range />
    </div>
    <div class="box">
      <span>单个触发器</span>
      <n-time-picker v-model="time4" type="seconds" is-range :trigger-number="1" />
    </div>
    <div class="box">
      <span>是否解除联动</span>
      <n-time-picker v-model="time5" type="seconds" is-range :isLinkPanels="false" />
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
    const time5 = ref();

    return {
      time1,
      time2,
      time3,
      time4,
      time5,
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
