<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>默认底部按钮</span>
      <n-time-picker v-model="time1" type="minutes"></n-time-picker>
    </div>
    <div class="box">
      <span>自定义底部按钮（插槽）</span>
      <n-time-picker
        ref="NTimePickerRef"
        v-model="time2"
        type="minutes"
        @changePanelTime="onChangePanelTime"
      >
        <template #footer="{ disabled }">
          <div class="demo-n-time-picker-footer">
            <n-button :plain="true" size="small" @click="onHandleNow">Now</n-button>
            <n-button type="primary" size="small" :disabled="disabled" @click="onConfirm">
              Confirm
            </n-button>
          </div>
        </template>
      </n-time-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const time1 = ref();
    let time2 = ref();
    const NTimePickerRef = ref();

    let pickDate = ref();

    function onChangePanelTime(date: Date) {
      pickDate.value = date;
      console.info('onChangePanelTime', date);
    }

    function close() {
      NTimePickerRef.value.onHide();
    }

    function onConfirm() {
      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      time2.value = new Date(y, m, d, pickDate.value.hours, pickDate.value.minutes);
      close();
    }

    function onHandleNow() {
      time2.value = new Date(Date.now());
      close();
    }

    return {
      time1,
      time2,
      NTimePickerRef,
      onChangePanelTime,
      onConfirm,
      onHandleNow,
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

.demo-n-time-picker-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
