<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>自定义文案（显示次日）</span>
      <h-time-picker
        v-model="time1"
        type="minutes"
        :format-trigger-text="formatTriggerText"
        :format-cell-text="formatCellText"
        :picker-options="pickerOptions"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const time1 = ref();
    const pickerOptions = {
      selectableHours: ['0-32'],
    };

    function formatCellText(type: string, date: number) {
      if (type === 'hours' && date > 23) {
        return `次日${date - 24}`;
      }

      return date;
    }

    function formatTriggerText(date: Date, text: string) {
      const selectDate = new Date(date).getDate()
      const nowDate = new Date().getDate()

      return text && selectDate > nowDate ? `次日 ${text}` : text
    }

    return {
      time1,
      pickerOptions,
      formatCellText,
      formatTriggerText,
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
