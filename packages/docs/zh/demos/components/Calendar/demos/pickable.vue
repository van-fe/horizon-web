<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="Pickable">
      <n-radio-group v-model="pickable">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="DateType">
      <n-radio-group v-model="dateType">
        <n-radio label="full">Full</n-radio>
        <n-radio label="only-current">Only Current</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-calendar
    :pickable="pickable"
    :date-type="dateType"
    :disable-date="disableDate"
    :mode-switchable="true"
    @date-click="onDateClick"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const pickable = ref(true);
    const dateType = ref('full');

    function onDateClick(date: string, type: 'month' | 'year' | 'week') {
      console.info(date, type);
    }

    function disableDate(date: Dayjs) {
      return [0, 6].includes(date.day());
    }

    return {
      pickable,
      dateType,
      onDateClick,
      disableDate,
    };
  },
});
</script>
