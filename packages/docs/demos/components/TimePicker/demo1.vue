<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>单列</span>
      <h-time-picker v-model="time1" type="time" />
    </div>
    <div class="box">
      <span>单列+按钮</span>
      <h-time-picker v-model="time4" type="time" :show-footer="true" />
    </div>
    <div class="box">
      <span>两列</span>
      <h-time-picker v-model="time2" type="minutes" />
    </div>
    <div class="box">
      <span>三列</span>
      <h-time-picker v-model="time3" type="seconds" />
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

    return {
      time1,
      time2,
      time3,
      time4,
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
