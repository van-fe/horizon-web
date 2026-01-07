<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>默认日期</span>
      <h-date-picker v-model="time1" type="date" />
    </div>
    <div class="box">
      <span>快捷选择日期</span>
      <h-date-picker v-model="time2" type="date" :shortcuts="shortcuts" />
    </div>
    <div class="box">
      <span>隐藏年份按钮</span>
      <h-date-picker v-model="time3" type="date" :show-year-button="false" />
    </div>
    <div class="box">
      <span>自定义周一到周日排序</span>
      <h-date-picker v-model="time4" type="date" :first-day-of-week="1" />
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

    let shortcuts = ref([
      {
        label: 'Yesterday',
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        },
      },
      {
        label: 'Today',
        value: () => new Date(),
      },
      {
        label: 'Last 7 days',
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      },
    ]);

    return {
      time1,
      time2,
      time3,
      time4,
      shortcuts,
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
  width: 100%;
  margin: 10px;
}
</style>
