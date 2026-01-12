<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>设置前缀、后缀图标</span>
      <h-date-picker
        v-model="time1"
        type="date"
        prefix-icon="setting"
        suffix-icon="close"
      ></h-date-picker>
    </div>
    <div class="box">
      <span>设置前缀、后缀图标（插槽）</span>
      <h-date-picker v-model="time2" type="date">
        <template #prefix>pre</template>
        <template #suffix>suf</template>
      </h-date-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let time1 = ref();
    let time2 = ref();

    return {
      time1,
      time2,
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
