<template>
  <div class="demo-wrapper">
    <div class="box">
      <span>自定义触发器</span>
      <n-date-picker
        v-model="time1"
        value-format="YYYY/MM/DD"
        type="date"
        @popperChange="popperChange"
      >
        <template #reference="{ reference }">
          <div class="reference-container">
            <n-button plain>自定义触发器{{ reference }}</n-button>
          </div>
        </template>
      </n-date-picker>
    </div>
    <div class="box">
      <span>日期面板嵌入页面（非浮层样式）</span>
      <div class="trigger-box">
        <n-button class="trigger-button" plain @click="onShow">日期面板嵌入</n-button>
        <div v-if="visible" class="arrow-box">
          <a-icon name="toggle_left" @click="onChangeYear(-1)" />
          <a-icon name="arrow_left" @click="onChangeMonth(-1)" />
          <a-icon name="arrow_right" @click="onChangeMonth(1)" />
          <a-icon name="toggle_right" @click="onChangeYear(1)" />
        </div>
      </div>
      <n-date-picker
        v-if="visible"
        ref="datePickerPanelRef"
        v-model="time2"
        type="panel"
        :show-header="false"
        @pick="onPick"
      />
      日期选中值：{{ time2 }}
    </div>
    <div class="box">
      <span>日期面板嵌入页面（show-embed）</span>
      <div class="trigger-box">
        <n-button class="trigger-button" plain @click="onShow1">show-embed</n-button>
      </div>
      <n-date-picker
        v-if="visible1"
        ref="panelContentRef"
        v-model="time3"
        type="daterange"
        :show-embed="true"
        @change="onChange"
      />
      日期选中值：{{ time3 }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
  setup() {
    let time1 = ref('2022/06/01');
    let time2 = ref('2022/06/01');
    let time3 = ref();
    const visible = ref(false);
    const visible1 = ref(false);
    const datePickerPanelRef = ref();

    function onPick(date: Date) {
      console.info('onPick date', date);
      onHide();
    }
    function onShow() {
      visible.value = true;
    }
    function onHide() {
      visible.value = false;
    }
    function onShow1() {
      visible1.value = true;
    }
    function onChange() {
      visible1.value = false;
    }
    function onChangeYear(num: number) {
      datePickerPanelRef.value.changeYear(num);
    }
    function onChangeMonth(num: number) {
      datePickerPanelRef.value.changeMonth(num);
    }
    function popperChange(value: boolean) {
      console.info('popperChange', value);
    }

    return {
      time1,
      time2,
      time3,
      visible,
      visible1,
      onShow,
      onShow1,
      onChangeYear,
      onChangeMonth,
      onPick,
      popperChange,
      datePickerPanelRef,
      onChange,
    };
  },
});
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.demo-wrapper .box {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.demo-wrapper .box .reference-container {
  position: relative;
  display: flex;
}

.demo-wrapper .box .trigger-box {
  display: flex;
  align-items: center;
  width: 304px;
}

.demo-wrapper .box .trigger-box .trigger-button {
  width: 205px;
}

.demo-wrapper .box .trigger-box .arrow-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.demo-wrapper .box .trigger-box .arrow-box .a-icon {
  cursor: pointer;
}
</style>
