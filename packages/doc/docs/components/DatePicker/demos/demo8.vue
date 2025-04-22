<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>单月模式</span>
      <n-date-picker v-model="time1" type="date" :show-footer="true"></n-date-picker>
    </div>
    <div class="box">
      <span>单月+时间 默认footer</span>
      <n-date-picker v-model="time2" type="datetime"></n-date-picker>
    </div>
    <div class="box">
      <span>自定义footer</span>
      <n-date-picker ref="datePickerRef" v-model="time3" type="dateseconds" @pick="onPick">
        <template #footer="{ disabled }">
          <div>
            <n-button :text="true" size="small" plain @click="handleTime">
              Five minutes later
            </n-button>
          </div>
          <div>
            <n-button :plain="true" size="small" @click="onCancel">Cancel</n-button>
            <n-button type="primary" size="small" :disabled="disabled" @click="onConfirm">
              Confirm
            </n-button>
          </div>
        </template>
      </n-date-picker>
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
    const datePickerRef = ref();
    let pickDate = ref();

    function onPick(date: Date) {
      pickDate.value = date;
      console.log('onPick', date);
    }
    function close() {
      datePickerRef.value.onHide();
    }
    function onConfirm() {
      time3.value = new Date(
        pickDate.value.years,
        pickDate.value.months,
        pickDate.value.date,
        pickDate.value.hours,
        pickDate.value.minutes,
      );
      close();
    }
    function onCancel() {
      close();
    }
    function handleTime() {
      const datetime = new Date(Date.now() + 5 * 60 * 1000);
      datePickerRef.value.initPicker(datetime);
    }

    return {
      time1,
      time2,
      time3,
      onPick,
      datePickerRef,
      onConfirm,
      onCancel,
      handleTime,
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
