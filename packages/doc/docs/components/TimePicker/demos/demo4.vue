<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>设置前缀、后缀图标</span>
      <n-time-picker
        v-model="time1"
        type="minutes"
        prefix-icon="setting"
        suffix-icon="close"
      ></n-time-picker>
    </div>
    <div class="box">
      <span>设置前缀、后缀图标（插槽）</span>
      <n-time-picker v-model="time2" type="minutes">
        <template #prefix>pre</template>
        <template #suffix>suf</template>
      </n-time-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const time1 = ref();
    const time2 = ref();

    return {
      time1,
      time2,
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
